import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule as CronScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './models/users';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GQLAuthMiddleware } from './modules/auth/gqlauth.middleware';
import { AuthRequiredDirective } from './modules/auth/authRequiredDirective';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { PatientModule } from './modules/patient/patient.module';
import { ConfigModule } from '@nestjs/config'
import config from './config/config'

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://localhost:27017/patient_registration_service', {
			user: 'prs_admin',
			pass: 'password',
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
		}),
		GraphQLModule.forRoot({
			include: [UsersModule],
			typePaths: ['./**/*.graphql'],
			// definitions: {
			// 	path: join(process.cwd(), 'src/graphql.ts'),
			// 	outputAs: 'class',
			// },
			context: ({ req }) => ({ user_id: req.user_id, user_role: req.user_role }),
			schemaDirectives: {
				authRequired: AuthRequiredDirective,
			},
		}),
		ConfigModule.forRoot({
			load: [config],
			isGlobal: true,
		}),
		CronScheduleModule.forRoot(),
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		UsersModule,
		AuthModule,
		ScheduleModule,
		PatientModule,
	],
	controllers: [AppController],
	providers: [{
		provide: AppService,
		useClass: AppService
	}],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(GQLAuthMiddleware)
			.forRoutes({ path: 'graphql', method: RequestMethod.POST })
	}
}
