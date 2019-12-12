import { Controller, Post, Body, Inject, UsePipes, UseGuards, Request } from '@nestjs/common';
import { IUserService } from './user.service';
import { CreateUserDto } from './signup.dto';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { SignupValidationPipe } from './validateSignup.pipe';
import { HashPasswordPipe } from './hashPassword.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
	constructor(@Inject(UserServiceToken) private readonly userService: IUserService) { }

	@Post('/signup')
	@UsePipes(HashPasswordPipe)
	@UsePipes(SignupValidationPipe)
	async signUp(@Body() newUser: CreateUserDto): Promise<string> {

		const user = await this.userService.create(newUser) //TODO validate input, hash password!, check if user exists already

		return `${user.name} successufully signed up!`

	}

	@UseGuards(AuthGuard('local'))
	@Post('auth/login')
	async login(@Request() req) {
		return req.user;
	}
}