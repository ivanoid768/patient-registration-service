import { Injectable, CanActivate, ExecutionContext, Inject, ForbiddenException } from "@nestjs/common";
import { Request } from "express";
import { IUserService } from "./auth.service";
import { UserServiceToken } from "src/common/IoC_Tokens";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard, UserRequest } from "./auth.guard";

@Injectable()
export class GQLAuthGuard extends AuthGuard {

    getRequest(context:ExecutionContext){
        return GqlExecutionContext.create(context).getContext<{req: UserRequest}>().req;
    }

}