import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor } from '../../models/doctor';
import { User } from '../../models/users';
import { Appointment } from 'src/models/appointment';
import { AppointmentService } from './appointment.service';
import { PatientService } from './patient.service';
import { PatientResolver } from './patient.resolver';
import { PatientController } from './patient.controller';
import { Patient } from 'src/models/patient';
import { Timeslot } from 'src/models/timeslot';
import { MailerService } from 'src/common/mailer';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Doctor.DoctorToken,
                schema: Doctor.DoctorSchema,
                collection: User.UserCollectionName
            },
            {
                name: Patient.PatientToken,
                schema: Patient.PatientSchema,
            },
            {
                name: Appointment.AppointmentToken,
                schema: Appointment.AppointmentSchema
            },
            {
                name: Timeslot.TimeslotToken,
                schema: Timeslot.TimeslotSchema
            },
        ]),
        MailerService
    ],
    controllers: [
        PatientController
    ],
    providers: [
        AppointmentService,
        PatientService,
        PatientResolver,
    ],
})
export class PatientModule { }
