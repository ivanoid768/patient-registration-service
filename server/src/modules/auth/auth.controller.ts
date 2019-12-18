import { Controller, Post, Body, Inject, UsePipes, UseGuards, Request } from '@nestjs/common';
import { IUserService } from './auth.service';
import { CreateUserDto } from './signup.dto';
import { UserServiceToken } from 'src/common/IoC_Tokens';
import { SignupValidationPipe } from './validateSignup.pipe';
import { HashPasswordPipe } from './hashPassword.pipe';
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

	@Post('login')
	async login(@Body('email') email: string, @Body('password') password: string) {

		const token = await this.userService.login(email, password)

		if (token instanceof Error) {
			console.log(`login_error:`, token);
			return {
				error:token.message
			};
		}

		return {
			userEmail: email,
			token: token
		}
	}

	@Post('logout')
	getProfile(@Request() { user }: { user: User.IUser }) {
		return `${user.email} logged out!`;
	}
}