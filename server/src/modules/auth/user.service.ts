import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './signup.dto';
import { User } from 'src/models/users';
import { Owner } from 'src/models/owner'

export interface IUserService {
	create(arg1: CreateUserDto): Promise<User.IUser>
	hasUser(createUserDto: CreateUserDto): Promise<boolean>
}

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectModel('User') private readonly userModel: Model<User.IUser>
		// @InjectModel(Owner.OwnerToken) private readonly ownerModel: Model<Owner.IOwner>
	) { }

	async create(createUserDto: CreateUserDto): Promise<User.IUser> {
		return this.userModel.create(createUserDto);
	}

	async hasUser(createUserDto: CreateUserDto): Promise<boolean> {
		const count = await this.userModel.count({ email: createUserDto.email }).exec();
		return count > 0;
	}

}
