import { Controller, Post, Body, Inject, UsePipes } from '@nestjs/common';
import { IUserService } from './user.service';
import { CreateUserDto } from './signup.dto';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { SignupValidationPipe } from './validateSignup.pipe';

@Controller()
export class AuthController {
  constructor(@Inject(UserServiceToken) private readonly userService: IUserService) {}

  @Post('/signup')
  @UsePipes(SignupValidationPipe)
  async signUp( @Body() newUser: CreateUserDto ): Promise<string> {

    const user = await this.userService.create(newUser) //TODO validate input, hash password!, check if user exists already

    return `${user.name} successufully signed up!`

  }
}