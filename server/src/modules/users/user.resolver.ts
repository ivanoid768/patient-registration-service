import { Resolver, Query , Context } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

interface UserRequest {
    user_id: string;
}

@Resolver('User')
export class UserResolver {
    constructor(
        // @Inject(UserService) private readonly userService: UserService,
        private readonly userService: UserService,
    ) { }

    @Query('me')
    @UseGuards(AuthGuard)
    async getCurrentUserProfile(@Context() ctx: { req: UserRequest }) {
        return this.userService.getProfile(ctx.req.user_id)
    }

    // @Query('author')
    // async getAuthor(@Args('id') id: number) {
    //     return await this.userService.
    // }

    // @ResolveProperty('posts')
    // async getPosts(@Parent() author) {
    //     const { id } = author;
    //     return await this.postsService.findAll({ authorId: id });
    // }
}