import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from '../../../models/doctor';
import { Model, Schema } from 'mongoose';
import { User, Role } from '../../../models/users';
import { CreateDoctorDto } from './doctor.dto';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.DoctorToken) private readonly doctorModel: Model<Doctor.IDoctor>,
        @InjectModel(User.UserToken) private readonly userModel: Model<User.IUser>
    ) { }

    async create(doctor: CreateDoctorDto) {
        return this.doctorModel.create({
            ...doctor, role: Role.User
        })
    }

    async list(search?: string) {
        let doctorList = await this.doctorModel.find({}).exec()

        return doctorList;
    }

    async delete(doctorId: Schema.Types.ObjectId | string) {
        return this.doctorModel.findByIdAndDelete(doctorId)
    }
}
