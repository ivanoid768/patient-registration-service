import { Injectable, CanActivate, ExecutionContext, Inject, ForbiddenException } from "@nestjs/common";
import { Request } from "express";
import { IUserService } from "./auth.service";
import { UserServiceToken } from "src/common/IoC_Tokens";

interface UserRequest extends Request{
    user_id: string;
}

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(UserServiceToken) private readonly userService: IUserService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest<UserRequest>();
        const auth_token = request?.header('Authorization')

        if (!auth_token) {
            return false;
        }

        let userId = await this.userService.getUserIdByToken(auth_token)
        if(userId instanceof ForbiddenException){
            return false;
        }

        if(userId instanceof Error){
            throw userId;
        }

        request.user_id = userId;

        return true;
    }

}