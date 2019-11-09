import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './models/users';
import { AuthController } from './modules/auth/auth.controller';
import { UserService, IUserService } from './modules/auth/user.service';

// const UserServiceProvider ={
//   provide: IUserService,
//   userClass: UserService
// }

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
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AppController, AuthController],
  providers: [{
    provide: AppService,
    useClass: AppService
  }, {
    provide: IUserService,
    useClass: UserService,
  }],
})
export class AppModule { }
