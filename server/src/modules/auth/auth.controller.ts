import { Controller, Post, Body, Inject, UsePipes, UseGuards, Request } from '@nestjs/common';
import { IUserService } from './user.service';
import { CreateUserDto } from './signup.dto';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { SignupValidationPipe } from './validateSignup.pipe';
import { HashPasswordPipe } from './hashPassword.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/users';

@Controller('auth')
export class AuthController {
	constructor(@Inject(UserServiceToken) private readonly userService: IUserService) { }

	@Post('signup')
	@UsePipes(HashPasswordPipe)
	@UsePipes(SignupValidationPipe)
	async signUp(@Body() newUser: CreateUserDto): Promise<string> {
		const user = await this.userService.create(newUser)

		return `${user.name} successufully signed up!`
	}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Request() { user }: { user: User.IUser }) {
		return {
			user: user.email,
			token: await this.userService.login(user)
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('logout')
	getProfile(@Request() { user }: { user: User.IUser }) {
		return `${user.email} logged out!`;
	}
}