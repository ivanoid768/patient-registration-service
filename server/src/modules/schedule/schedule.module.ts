import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor } from '../../models/doctor';
import { User } from '../../models/users';
import { ScheduleService } from './schedule.service';
import { ScheduleSettingsService } from './schedule_settings.service';
import { ScheduleResolver } from './schedule.resolver';
import { Schedule } from 'src/models/schedule';
import { ScheduleSettings, DaySchedule, WeekSchedule, MonthSchedule } from 'src/models/schedule_settings';
import { Appointment } from 'src/models/appointment';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Doctor.DoctorToken,
                schema: Doctor.DoctorSchema,
                collection: User.UserCollectionName
            },
            {
                name: Schedule.ScheduleToken,
                schema: Schedule.ScheduleSchema,
            },
            {
                name: ScheduleSettings.ScheduleSettingsToken,
                schema: ScheduleSettings.ScheduleSettingsSchema,
            },
            {
                name: Appointment.AppointmentToken,
                schema: Appointment.AppointmentSchema
            },
            {
                name: DaySchedule.DayScheduleToken,
                schema: DaySchedule.DayScheduleSchema
            },
            {
                name: WeekSchedule.WeekScheduleToken,
                schema: WeekSchedule.WeekScheduleSchema
            },
            {
                name: MonthSchedule.MonthScheduleToken,
                schema: MonthSchedule.MonthScheduleSchema
            },
        ]),
    ],
    providers: [
        ScheduleService,
        ScheduleSettingsService,
        ScheduleResolver
    ],
})
export class ScheduleModule { }
