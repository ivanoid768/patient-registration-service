import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from 'src/models/appointment';
import { CreateAppointmentDto } from './patient.dto';
import { Doctor } from 'src/models/doctor';
import { Patient } from 'src/models/patient';
import { Timeslot } from 'src/models/timeslot';
import { MailerService } from 'src/common/mailer';

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment.AppointmentToken) private readonly appointmentModel: Model<Appointment.IAppointment>,
        @InjectModel(Timeslot.TimeslotToken) private readonly timeslotModel: Model<Timeslot.ITimeslot>,
        @InjectModel(Doctor.DoctorToken) private readonly doctorModel: Model<Doctor.IDoctor>,
        @InjectModel(Patient.PatientToken) private readonly patientModel: Model<Patient.IPatient>,
        private readonly mailer: MailerService,
    ) { }

    async create(input: CreateAppointmentDto) {
        let doctor = await this.doctorModel.findById(input.doctorId)
        if (!doctor) {
            throw new Error(`invalid_doctor_id:${input.doctorId}`)
        }

        let timeslot = await this.timeslotModel.findById(input.appointmentId)
        if (!timeslot) {
            throw new Error(`invalid_timeslot_id:${input.appointmentId}`)
        }

        let patient = await this.patientModel.findOne({
            $or: {
                email: input.patientEmail,
                phone: input.patientPhone
            }
        }).exec()

        if (!patient) {
            patient = await this.patientModel.create({
                name: input.patientName,
                surname: input.patientSurname,
                middlename: input.patientSurname,
                phone: input.patientPhone,
                email: input.patientEmail
            })
        }

        timeslot.doctors.push(doctor._id)
        await timeslot.save()

        let appointment = await this.appointmentModel.create({
            patient: patient._id,
            doctor: doctor._id,
            timeslot: timeslot._id,
            free: false,
            notes: input.notes,
            scheduleId: doctor.schedule,
            date: timeslot.date
        })

        if (patient.email) {
            this.mailer.mail.sendMail({
                subject: `Регистрация на прием к врачу. Специализация: ${doctor.specialization}.`, // TODO clinic name
                text: `Уважаемый ${patient.surname} ${patient.name} ${patient.middlename} вы зарегистрированы на прием к ${doctor.name} ${doctor.surname}. 
                    Дата приема: ${appointment.date.from}`,
                to: patient.email
            })
        }

        return { appointment, doctor, patient }
    }

    async freeAppointmentList(doctorId: string, forRestAPI: boolean = false) {
        let doctor = await this.doctorModel.findById(doctorId)
        if (!doctor) {
            throw new Error(`invalid_doctor_id:${doctorId}`)
        }

        let freeAppointments = await this.timeslotModel
            .find({
                scheduleId: doctor.schedule,
                doctors: { $nin: doctorId },
            }, forRestAPI ? '-doctors -scheduleId' : null)
            .exec()

        return freeAppointments;
    }

    async cancel(appointmentId: string) {
        let appointment = await this.appointmentModel.findById(appointmentId)
        if (!appointment) {
            throw new Error(`invalid_appointment_id:${appointmentId}`)
        }

        let timeslot = await this.timeslotModel.findById(appointment.timeslot)
        if (!timeslot) {
            throw new Error(`invalid_timeslot_id:${appointment.timeslot}`)
        }

        timeslot.doctors.splice(timeslot.doctors.findIndex(doctor => doctor === appointment.doctor))
        await timeslot.save()

        let removedAppointment = await appointment.remove()

        return removedAppointment;
    }

    async rearrange(appointmentId: string, timeslotId: string) {
        let timeslot = await this.timeslotModel.findById(timeslotId)
        if (!timeslot) {
            throw new Error(`invalid_timeslot_id:${appointmentId}`)
        }

        let oldAppointment = await this.appointmentModel.findById(appointmentId)
        if (!oldAppointment) {
            throw new Error(`invalid_appointment_id:${appointmentId}`)
        }

        let appointment = await this.appointmentModel.create({
            patient: oldAppointment.patient,
            doctor: oldAppointment.doctor,
            timeslot: timeslot._id,
            free: false,
            notes: oldAppointment.notes,
            scheduleId: oldAppointment.scheduleId,
            date: timeslot.date
        })

        this.cancel(oldAppointment._id)

        return appointment;
    }

}
