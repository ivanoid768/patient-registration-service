import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { DoctorService } from "./doctor.service";
import { CreateDoctorInput } from "./doctor.dto";
import { UsePipes } from "@nestjs/common";
import { HashPasswordPipe } from "../../auth/hashPassword.pipe";

@Resolver('Doctor')
export class DoctorResolver {
    constructor(
        private readonly doctorService: DoctorService,
    ) { }

    @Query('listDoctor')
    async getDoctorList() {
        return this.doctorService.list()
    }

    @Mutation('addDoctor')
    @UsePipes(HashPasswordPipe)
    async addDoctor(@Args('input') input: CreateDoctorInput) {
        // console.log(input);
        return this.doctorService.create(input)
    }

    @Mutation('removeDoctor')
    async delete(@Args('id') id: string) {
        return this.doctorService.delete(id)
    }

}