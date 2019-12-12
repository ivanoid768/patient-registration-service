import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super();
    }

    async validate(login: string, password: string): Promise<any> {
        const user = await this.userService.getOneByEmail(login);

        if (!user) {
            throw new UnauthorizedException();
        }

        const passwordIsValid = await bcrypt.compare(password,user.password)

        if(!passwordIsValid){
            throw new UnauthorizedException(`invalid_password`);
        }

        return user;
    }
}