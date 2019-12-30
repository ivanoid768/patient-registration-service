import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './models/users';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import { GQLAuthMiddleware } from './modules/auth/gqlauth.middleware';

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
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
			},
			context: ({ req }) => ({ req }),
		}),
		MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
		UsersModule,
		AuthModule
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
