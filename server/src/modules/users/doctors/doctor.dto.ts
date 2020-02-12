import { CreateUserDto } from "../user.dto";

export class CreateDoctorDto extends CreateUserDto {
    specialization: string;
}

export class CreateDoctorInput extends CreateDoctorDto {
    readonly passConfirm: string;
}