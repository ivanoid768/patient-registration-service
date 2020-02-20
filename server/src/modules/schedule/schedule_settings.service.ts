import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleSettings, IDaySchedule, IWeekSchedule, IMonthSchedule } from 'src/models/schedule_settings';
import { DayScheduleDto, WeekScheduleDto, MonthScheduleDto } from './schedule_settings.dto';

@Injectable()
export class ScheduleSettingsService {
    constructor(
        @InjectModel(ScheduleSettings.ScheduleSettingsToken) private readonly settingsModel: Model<ScheduleSettings.IScheduleSettings>,
    ) { }

    async getSettings() {
        let settings = await this.settingsModel.findOne().exec()

        return settings;
    }

    async updateAppointmentDuration(duration: number) {
        return this.settingsModel.findOneAndUpdate({}, { duration: duration }, { new: true })
    }

    async getDaySchedules() {
        let settings = await this.settingsModel.findOne().exec()
        return settings.daySchedules;
    }

    async getWeekSchedules() {
        let settings = await this.settingsModel.findOne().exec()
        return settings.weekSchedules;
    }

    async getMonthSchedules() {
        let settings = await this.settingsModel.findOne().exec()
        return settings.monthSchedules;
    }

    async createDaySchedule(daySchedule: DayScheduleDto) {
        let settings = await this.settingsModel.findOne().exec()

        settings.daySchedules.push(daySchedule as unknown as IDaySchedule)
        let updatedSettings = await settings.save()

        return updatedSettings.daySchedules;
    }

    async createWeekSchedule(weekSchedule: WeekScheduleDto) {
        let settings = await this.settingsModel.findOne().exec()

        settings.weekSchedules.push(weekSchedule as unknown as IWeekSchedule)
        let updatedSettings = await settings.save()

        return updatedSettings.weekSchedules;
    }

    async createMonthSchedule(monthSchedule: MonthScheduleDto) {
        let settings = await this.settingsModel.findOne().exec()

        settings.monthSchedules.push(monthSchedule as unknown as IMonthSchedule)
        let updatedSettings = await settings.save()

        return updatedSettings.monthSchedules;
    }
}
