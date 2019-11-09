import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './signup.dto';
import { IUser } from 'src/models/users';

export abstract class IUserService {
  public abstract create(arg1: CreateUserDto): Promise<IUser>
}

@Injectable()
export class UserService extends IUserService implements IUserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {
    super()
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    return this.userModel.create(createUserDto);
  }

}
