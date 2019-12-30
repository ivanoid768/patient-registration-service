import { NestMiddleware, Injectable, Inject, ForbiddenException } from "@nestjs/common";
import { Response } from "express";
import { UserServiceToken } from "src/common/IoC_Tokens";
import { IUserService } from "./auth.service";
import { UserRequest } from "./auth.guard";

@Injectable()
export class GQLAuthMiddleware implements NestMiddleware {

    constructor(
        @Inject(UserServiceToken) private readonly userService: IUserService
    ) { }

    async use(req: UserRequest, res: Response, next: Function) {
        console.log('Auth middleware...');

        const auth_token = req?.header('Authorization')

        if (!auth_token) {
            return false;
        }

        let userId = await this.userService.getUserIdByToken(auth_token)
        if (userId instanceof ForbiddenException) {
            return false;
        }

        if (userId instanceof Error) {
            throw userId;
        }

        req.user_id = userId;

        return next()
    }

}