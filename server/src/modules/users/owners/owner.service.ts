import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Owner } from '../../../models/owner';
import { Model, Schema } from 'mongoose';
import { User, Role } from '../../../models/users';
import { CreateOwnerDto } from './owner.dto';

@Injectable()
export class OwnerService {
    constructor(
        @InjectModel(Owner.OwnerToken) private readonly ownerModel: Model<Owner.IOwner>,
    ) { }

    async create(owner: CreateOwnerDto) {
        return this.ownerModel.create({
            ...owner, role: Role.Admin
        })
    }

    async getOneById(id: string) {
        return this.ownerModel.findById(id)
    }

    async list(search?: string) {
        let ownerList = await this.ownerModel.find({}).exec()

        return ownerList;
    }

    async confirmOwner(userId: Schema.Types.ObjectId | string, user: Owner.IOwner) {
        if (user.__t !== 'Owner') {
            throw new Error(`owner_type_required`)
        }

        let result = await this.ownerModel.findByIdAndUpdate(userId, { confirmed: true }, { new: true }).exec()
        // console.log(result);
        return result;
    }

    async delete(ownerId: Schema.Types.ObjectId | string) {
        return this.ownerModel.findByIdAndDelete(ownerId)
    }
}
