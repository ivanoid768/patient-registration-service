import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Receptionist } from 'src/models/receptionist';
import { Model, Schema } from 'mongoose';
import { User, Role } from 'src/models/users';
import { CreateReceptionistDto } from './receptionist.dto';

@Injectable()
export class ReceptionistService {
    constructor(
        @InjectModel(Receptionist.ReceptionistToken) private readonly receptionistModel: Model<Receptionist.IReceptionist>,
        @InjectModel(User.UserToken) private readonly userModel: Model<User.IUser>
    ) { }

    async create(receptionist: CreateReceptionistDto) {
        return this.receptionistModel.create(receptionist)
    }

    async list(search?: string) {
        let receptionistList = await this.receptionistModel.find({}).exec()

        return receptionistList;
    }

    async confirmCreation(user: User.IUser, receptionistId: Schema.Types.ObjectId | string) {
        if (user.role != Role.Owner) {
            return { status: 'error', error: new Error(`user_not_owner`) }
        }

        return this.userModel.findByIdAndUpdate(receptionistId, { confirmed: true, role: Role.Receptionist }).exec()
    }
}
