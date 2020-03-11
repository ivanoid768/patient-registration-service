import { Resolver, Query, Mutation, Args, Parent, ResolveProperty } from "@nestjs/graphql";
import { AppointmentService } from "./appointment.service";
import { Appointment } from "src/models/appointment";
import { DoctorService } from "../users/doctors/doctor.service"; // TODO move to common
import { PatientService } from "./patient.service";
import { ScheduleService } from "../schedule/schedule.service"; // TODO move to common

@Resolver('Appointment')
export class PatientResolver {
    constructor(
        private readonly appointmentService: AppointmentService,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService,
        // private readonly scheduleService: ScheduleService,
    ) { }

    @Query('getFreeAppointmentList')
    async getFreeAppointmentList(@Args('doctorId') doctorId: string) {
        this.appointmentService.freeAppointmentList(doctorId)
    }

    @Mutation('cancelAppointment')
    async cancelAppointment(@Args('id') id: string) {
        return this.appointmentService.cancel(id)
    }

    @Mutation('rearrangeAppointment')
    async rearrangeAppointment(@Args('appointmentId') appointmentId: string, @Args('timeslotId') timeslotId: string) {
        return this.appointmentService.rearrange(appointmentId, timeslotId)
    }

    @ResolveProperty('doctor')
    async getDoctor(@Parent() appointment: Appointment.IAppointment) {
        return (await this.doctorService.list()).filter(doctor => doctor.id = appointment.doctor)
    }

    @ResolveProperty('patient')
    async getPatient(@Parent() appointment: Appointment.IAppointment) {
        return this.patientService.getById(appointment.patient as unknown as string)
    }

    @ResolveProperty('timeslot')
    async getTimeslot(@Parent() appointment: Appointment.IAppointment) {
        return 'TODO'
    }

    @ResolveProperty('schedule')
    async getSchedule(@Parent() appointment: Appointment.IAppointment) {
        // return this.scheduleService.getById(appointment.scheduleId)
        return 'TODO'
    }

    @ResolveProperty('from')
    async getfrom(@Parent() appointment: Appointment.IAppointment) {
        return appointment.date.from;
    }

    @ResolveProperty('to')
    async getTo(@Parent() appointment: Appointment.IAppointment) {
        return appointment.date.to
    }

}