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

    async confirmCreation(user: User.IUser, receptionistId: Schema.Types.ObjectId | string) {
        if (user.role != Role.Owner) {
            return { status: 'error', error: new Error(`user_not_owner`) }
        }

        let result = await this.userModel.findByIdAndUpdate(receptionistId, { confirmed: true }, { new: true }).exec()
        // console.log(result);
        
        return result;
    }
}
