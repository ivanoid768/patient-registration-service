import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/users';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'MY_SECRET_JWT',
            signOptions: { expiresIn: '10h' },
        }),
        MongooseModule.forFeature([
            {
            name: User.UserToken,
            schema: UserSchema
        }])
    ],
    controllers: [
        AuthController
    ],
    providers: [{
        provide: UserServiceToken,
        useClass: UserService,
    },
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthModule { }
