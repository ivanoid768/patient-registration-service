import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './signup.dto';
import { User } from 'src/models/users';
import { Owner } from 'src/models/owner'
import { JwtService } from '@nestjs/jwt'

export interface IUserService {
	create(arg1: CreateUserDto): Promise<User.IUser>
	hasUser(createUserDto: CreateUserDto): Promise<boolean>
	getOneByEmail(email: string): Promise<User.IUser>
	getOneById(id: string): Promise<User.IUser>
	login(user: User.IUser): Promise<{ access_token: string }>
}

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectModel(User.UserToken) private readonly userModel: Model<User.IUser>,
		private readonly jwtService: JwtService
		// @InjectModel(Owner.OwnerToken) private readonly ownerModel: Model<Owner.IOwner>
	) { }

	async create(createUserDto: CreateUserDto): Promise<User.IUser> {
		return this.userModel.create(createUserDto);
	}

	async hasUser(createUserDto: CreateUserDto): Promise<boolean> {
		const count = await this.userModel.countDocuments({ email: createUserDto.email }).exec();
		return count > 0;
	}

	async getOneByEmail(email: string) {
		const user = await this.userModel.findOne({ email: email }).exec()

		if (!user) {
			throw new Error(`Has no user with email: ${email}`)
		}

		return user
	}

	async getOneById(id: string) {
		return this.userModel.findById(id).exec()
	}

	async login(user: User.IUser) {
		const payload = { userId: user.id };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}

}
