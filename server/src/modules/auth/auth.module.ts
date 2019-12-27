import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { UserService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/users';
import { Session, SessionSchema } from 'src/models/session';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.UserToken,
                schema: UserSchema
            },
            {
                name: Session.SessionToken,
                schema: SessionSchema
            }
        ])
    ],
    controllers: [
        AuthController
    ],
    providers: [
        {
            provide: UserServiceToken,
            useClass: UserService,
        }
    ],
    exports:[
        UserServiceToken
    ]
})
export class AuthModule { }
