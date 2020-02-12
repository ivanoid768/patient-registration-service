import { Resolver, Query , Context, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "../auth/gqlauth.guard";

@Resolver('User')
export class UserResolver {
    constructor(
        // @Inject(UserService) private readonly userService: UserService,
        private readonly userService: UserService,
    ) { }

    @Query('me')
    async getCurrentUserProfile(@Context() ctx: { user_id: string }) {
        return this.userService.getProfile(ctx.user_id)
    }

    @Mutation('confirm')
    async confirm(@Args('id') id: string, @Context() ctx: { user_id: string }) {
        let user = await this.userService.getProfile(ctx.user_id)

        return this.userService.confirmCreation(user, id)
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