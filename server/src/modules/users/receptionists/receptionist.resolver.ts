import { Resolver, Query, Context, Mutation, Args, ResolveProperty, Parent } from "@nestjs/graphql";
import { UserService } from '../user.service';
import { ReceptionistService } from "./receptionist.service";
import { Role } from "../../../models/users";
import { CreateReceptionistInput } from "./receptionist.dto";
import { UsePipes } from "@nestjs/common";
import { HashPasswordPipe } from "../../../modules/auth/hashPassword.pipe";

@Resolver('Receptionist')
export class ReceptionistResolver {
    constructor(
        private readonly receptionistService: ReceptionistService,
        private readonly userService: UserService,
    ) { }

    @Query('listReceptionist')
    async getReceptionistList() {
        return this.receptionistService.list()
    }

    @Mutation('addReceptionist')
    @UsePipes(HashPasswordPipe)
    async addReceptionist(@Args('input') input: CreateReceptionistInput) {
        // console.log(input);
        return this.receptionistService.create(input)
    }

    @Mutation('removeReceptionist')
    async delete(@Args('id') id: string) {
        return this.receptionistService.delete(id)
    }

}