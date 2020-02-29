import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient } from 'src/models/patient';

@Injectable()
export class PatientService {
    constructor(
        @InjectModel(Patient.PatientToken) private readonly patientModel: Model<Patient.IPatient>,
    ) { }

    async getById(patientId: string) {
        return this.patientModel.findById(patientId)
    }

}
