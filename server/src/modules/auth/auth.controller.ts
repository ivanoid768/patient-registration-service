import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './signup.dto';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  async signUp( @Body() newUser: CreateUserDto ): Promise<string> {

    const user = await this.userService.create(newUser) //TODO validate input, hash password!, check if user exists already

    return `${user.name} successufully signed up!`

  }
}