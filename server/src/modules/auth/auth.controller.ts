import { Controller, Post, Body, Inject } from '@nestjs/common';
import { IUserService } from './user.service';
import { CreateUserDto } from './signup.dto';
import { UserServiceToken } from 'src/common/IoC_Tokens';

@Controller()
export class AuthController {
  constructor(@Inject(UserServiceToken) private readonly userService: IUserService) {}

  @Post('/signup')
  async signUp( @Body() newUser: CreateUserDto ): Promise<string> {

    const user = await this.userService.create(newUser) //TODO validate input, hash password!, check if user exists already

    return `${user.name} successufully signed up!`

  }
}