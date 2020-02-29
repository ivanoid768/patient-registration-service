import { Controller, Post, Body, UsePipes, Get, Param } from '@nestjs/common';
import { Doctor } from 'src/models/doctor';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './patient.dto';

@Controller('appointment')
export class PatientController {
    constructor(
        private readonly appointmentService: AppointmentService,

    ) { }

    @Post('/create')
    async createAppointment(@Body() appointmentData: CreateAppointmentDto) {
        let newAppointment = await this.appointmentService.create(appointmentData)
        
        return {
            status: 'success',
            date: newAppointment.appointment.date,
            doctor: {
                name: newAppointment.doctor.name,
                surname: newAppointment.doctor.surname,
                middlename: newAppointment.doctor.middlename,
            },
            address: 'TODO',
            cancel_url: '/appointment/cancel/' + newAppointment.appointment.id,
        }
    }

    @Post('cancel')
    async cancelAppointment(@Body('appointment') appointmentId: string) {
        // TODO: notify the Doctor and some Receptionist.
    }

    @Get('/list/:doctor')
    async getFreeAppointments(@Param('doctor') doctorId: string) {
        let freeAppointments = await this.appointmentService.freeAppointmentList(doctorId, true)

        return freeAppointments
    }
}