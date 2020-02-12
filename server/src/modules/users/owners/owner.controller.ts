import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { SignupValidationPipe } from '../../auth/validateSignup.pipe';
import { HashPasswordPipe } from '../../auth/hashPassword.pipe'; // TODO: move to utils
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './owner.dto';
import { Owner } from '../../../models/owner';

@Controller('auth')
export class OwnerController {
	constructor(
		private readonly ownerService: OwnerService
	) { }

	@Post('signup/owner')
	@UsePipes(HashPasswordPipe)
	@UsePipes(SignupValidationPipe)
	async signUpOwner(@Body() newOwner: CreateOwnerDto) {
		let user: Owner.IOwner;
		try {
			user = await this.ownerService.create(newOwner)
		} catch (err) {
			return {
				statusCode: 500,
				error: err,
				message: err.message
			}
		}

		return `${user.name} successufully signed up!`
	}
}