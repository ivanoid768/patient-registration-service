import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './models/users';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

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
export class AppModule { }
