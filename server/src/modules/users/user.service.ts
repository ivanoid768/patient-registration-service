import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { User, Role } from '../../models/users';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.UserToken) private readonly userModel: Model<User.IUser>,
    ) { }

    async getProfile(userId: string) {
        return this.userModel.findById(userId)
    }

    async confirmCreation(userId: Schema.Types.ObjectId | string) {
        let result = await this.userModel.findByIdAndUpdate(userId, { confirmed: true }, { new: true }).exec()
        // console.log(result);
        return result;
    }

    async grandRole(userId: Schema.Types.ObjectId | string, role: Role) {
        return this.userModel.findByIdAndUpdate(userId, { role: role }, { new: true })
    }
}
