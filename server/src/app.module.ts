import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './models/users';
import { AuthController } from './modules/auth/auth.controller';
import { UserService } from './modules/auth/user.service';
import { UserServiceToken } from './common/IoC_Tokens';
import { UsersModule } from './modules/users/users.module';

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
    UsersModule
  ],
  controllers: [AppController, AuthController],
  providers: [{
    provide: AppService,
    useClass: AppService
  }, {
    provide: UserServiceToken,
    useClass: UserService,
  }],
})
export class AppModule { }
