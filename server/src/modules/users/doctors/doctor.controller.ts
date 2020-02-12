import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { SignupValidationPipe } from '../../auth/validateSignup.pipe';
import { HashPasswordPipe } from '../../auth/hashPassword.pipe'; // TODO: move to utils
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './doctor.dto';
import { Doctor } from 'src/models/doctor';

@Controller('auth')
export class DoctorController {
	constructor(
		private readonly doctorService: DoctorService
	) { }

	@Post('signup/doctor')
	@UsePipes(HashPasswordPipe)
	@UsePipes(SignupValidationPipe)
	async signUpDoctor(@Body() newDoctor: CreateDoctorDto) {
		let user: Doctor.IDoctor;
		try {
			user = await this.doctorService.create(newDoctor)
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