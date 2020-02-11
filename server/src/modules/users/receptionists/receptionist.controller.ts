import { Controller, Post, Body, Inject, UsePipes } from '@nestjs/common';
import { SignupValidationPipe } from '../../auth/validateSignup.pipe';
import { HashPasswordPipe } from '../../auth/hashPassword.pipe'; // TODO: move to utils
import { ReceptionistService } from './receptionist.service';
import { CreateReceptionistDto } from './receptionist.dto';

@Controller('auth')
export class ReceptController {
	constructor(
		private readonly receptionistService: ReceptionistService
	) { }

	@Post('signup/receptionist')
	@UsePipes(HashPasswordPipe)
	@UsePipes(SignupValidationPipe)
	async signUpRecept(@Body() newReceptionist: CreateReceptionistDto): Promise<string> {
		const user = await this.receptionistService.create(newReceptionist)

		return `${user.name} successufully signed up!`
	}
}