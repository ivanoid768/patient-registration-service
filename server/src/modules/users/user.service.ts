import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/users';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.UserToken) private readonly userModel: Model<User.IUser>,
    ){}

    async getProfile(userId: string){
        let user = (await this.userModel.findById(userId).exec()).toObject()
        delete user.password
        return user as User.IUser;
    }
}
