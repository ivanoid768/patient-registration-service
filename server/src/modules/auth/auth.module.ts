import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { UserService } from '../users/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
    imports:[
        LocalStrategy,
        PassportModule
    ],
    controllers: [
        AuthController
    ],
    providers: [{
        provide: UserServiceToken,
        useClass: UserService,
    }]
})
export class AuthModule { }
