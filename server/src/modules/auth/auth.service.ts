import { Model } from 'mongoose';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './signup.dto';
import { User } from 'src/models/users';
import { Session } from 'src/models/session';
import { compare as bcryptCompare } from 'bcrypt';
import { v1 as uuid } from 'uuid';

export interface IUserService {
	create(arg1: CreateUserDto): Promise<User.IUser>
	hasUser(createUserDto: CreateUserDto): Promise<boolean>
	getOneByEmail(email: string): Promise<User.IUser>
	getOneById(id: string): Promise<User.IUser>
	login(email: string, password: string): Promise<string | Error>
	logout(userId: string): Promise<string | Error>
	getUserIdByToken(token: string): Promise<string | Error>;
}

@Injectable()
export class UserService implements IUserService {
	constructor(
		@InjectModel(User.UserToken) private readonly userModel: Model<User.IUser>,
		@InjectModel(Session.SessionToken) private readonly sessionModel: Model<Session.ISession>,
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

	async login(email: string, password: string) {
		let user = await this.userModel.findOne({ email: email.trim().toLowerCase() }).exec()
		if (!user) {
			return new Error(`user_not_exist`)
		}

		let session = await this.sessionModel.findOne({ userId: user.id }).exec()
		if (session) {
			return session.token;
		}

		let passIsValid = await bcryptCompare(password, user.password)
		if (!passIsValid) {
			return new Error('invalid_password')
		}

		let newSession = await this.sessionModel.create({
			userId: user.id,
			token: uuid()
		})

		return newSession.token
	}

	async logout(userId:string) {
		let ok = await this.sessionModel.findOneAndDelete({userId: userId}).exec()

		return `User with id: ${ok.userId} logged out. Token ${ok.token} is invalid`

	}

	async getUserIdByToken(token: string){
		let userId = (await this.sessionModel.findOne({ token: token }).exec())?.userId
        if (!userId) {
            return new ForbiddenException(`invalid_token`);
		}
		
		return userId;

	}

}
