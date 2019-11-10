import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './signup.dto';
import { IUser } from 'src/models/users';

export interface IUserService {
  create(arg1: CreateUserDto): Promise<IUser>
  hasUser(createUserDto: CreateUserDto): Promise<boolean>
}

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    return this.userModel.create(createUserDto);
  }

  async hasUser(createUserDto: CreateUserDto): Promise<boolean> {
    const count = await this.userModel.count({email:createUserDto.email}).exec();
    return count > 0;
  }

}
