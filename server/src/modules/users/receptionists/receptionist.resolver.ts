import { Resolver, Query, Context, Mutation, Args } from "@nestjs/graphql";
import { UserService } from '../user.service';
import { ReceptionistService } from "./receptionist.service";
import { Role } from "src/models/users";
import { CreateReceptionistInput } from "./receptionist.dto";

@Resolver('Receptionist')
export class UserResolver {
    constructor(
        private readonly receptionistService: ReceptionistService,
        private readonly userService: UserService,
    ) { }

    @Query('listReceptionist')
    async getReceptionistList(@Context() ctx: { user_id: string }) {
        let user = await this.userService.getProfile(ctx.user_id)

        if (user.role !== Role.Owner) {
            throw new Error('fobidden')
        }

        return this.receptionistService.list()
    }

    @Mutation('addReceptionist')
    async addReceptionist(@Args() input: CreateReceptionistInput) {

        return this.receptionistService.create(input)
    }

    @Mutation('confirm')
    async confirm(@Args('id') id: string, @Context() ctx: { user_id: string }) {
        let user = await this.userService.getProfile(ctx.user_id)

        return this.receptionistService.confirmCreation(user,id)
    }

}