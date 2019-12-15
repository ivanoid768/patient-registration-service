import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject, Body } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UserServiceToken } from 'src/common/IoC_Tokens';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject(UserServiceToken) private readonly userService: UserService) {
        super({
            usernameField: 'email'
        });
    }

    async validate(@Body('email') email: string, @Body('password') password: string): Promise<any> {
        
        const user = await this.userService.getOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('email');
        }

        const passwordIsValid = await bcrypt.compare(password, user.password)

        if (!passwordIsValid) {
            throw new UnauthorizedException(`invalid_password`);
        }

        return user;
    }
}