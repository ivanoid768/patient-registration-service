import { Controller, Post, Body, UsePipes, Get } from '@nestjs/common';
import { SignupValidationPipe } from '../../auth/validateSignup.pipe';
import { HashPasswordPipe } from '../../auth/hashPassword.pipe'; // TODO: move to utils
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './doctor.dto';
import { Doctor } from 'src/models/doctor';

@Controller()
export class DoctorController {
	constructor(
		private readonly doctorService: DoctorService
	) { }

	@Post('auth/signup/doctor')
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

	@Get('/doctor/list')
	async getDoctors() {
		let doctors = await this.doctorService.respAPIList()

		return doctors
	}
}