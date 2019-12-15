import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { UserServiceToken } from 'src/common/IoC_Tokens';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(UserServiceToken) private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'MY_SECRET_JWT',
        });
    }

    async validate({ userId }: { userId: string }) {
        return this.userService.getOneById(userId)
    }
}