import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { OwnerService } from "./owner.service";
import { CreateOwnerInput } from "./owner.dto";
import { UsePipes } from "@nestjs/common";
import { HashPasswordPipe } from "../../auth/hashPassword.pipe";

@Resolver('Owner')
export class OwnerResolver {
    constructor(
        private readonly ownerService: OwnerService,
    ) { }

    @Query('listOwner')
    async getOwnerList() {
        return this.ownerService.list()
    }

    @Mutation('addOwner')
    @UsePipes(HashPasswordPipe)
    async addOwner(@Args('input') input: CreateOwnerInput) {
        // console.log(input);
        return this.ownerService.create(input)
    }

    @Mutation('confirmOwner')
    async confirm(@Args('id') id: string, @Context() ctx: { user_id: string }) {
        let user = await this.ownerService.getOneById(ctx.user_id)

        return this.ownerService.confirmOwner(id, user)
    }

    @Mutation('removeOwner')
    async delete(@Args('id') id: string) {
        return this.ownerService.delete(id)
    }

}