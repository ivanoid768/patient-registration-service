import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleSettings, IDaySchedule, IWeekSchedule, IMonthSchedule } from 'src/models/schedule_settings';
import { DayScheduleDto, WeekScheduleDto, MonthScheduleDto } from './schedule_settings.dto';
import { Schedule } from 'src/models/schedule';
import { Appointment } from 'src/models/appointment';
import { CreateScheduleDto } from './schedule.dto';

@Injectable()
export class ScheduleSettingsService {
    constructor(
        @InjectModel(ScheduleSettings.ScheduleSettingsToken) private readonly settingsModel: Model<ScheduleSettings.IScheduleSettings>,
        @InjectModel(Schedule.ScheduleToken) private readonly scheduleModel: Model<Schedule.ISchedule>,
        @InjectModel(Appointment.AppointmentToken) private readonly appointmentModel: Model<Appointment.IAppointment>,
    ) { }

    async createSchedule(inputSchedule: CreateScheduleDto) {


    }

}
