import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleSettings, DaySchedule, WeekSchedule, MonthSchedule, DayOfWeek, WeekOfMonth } from 'src/models/schedule_settings';
import { DayScheduleDto, WeekScheduleDto, MonthScheduleDto } from './schedule_settings.dto';

@Injectable()
export class ScheduleSettingsService {
    constructor(
        @InjectModel(ScheduleSettings.ScheduleSettingsToken) private readonly settingsModel: Model<ScheduleSettings.IScheduleSettings>,
        @InjectModel(DaySchedule.DayScheduleToken) private readonly dayScheduleModel: Model<DaySchedule.IDaySchedule>,
        @InjectModel(WeekSchedule.WeekScheduleToken) private readonly weekScheduleModel: Model<WeekSchedule.IWeekSchedule>,
        @InjectModel(MonthSchedule.MonthScheduleToken) private readonly monthScheduleModel: Model<MonthSchedule.IMonthSchedule>,
    ) { }

    async getSettings() {
        let settings = await this.settingsModel.findOne().exec()

        return settings;
    }

    async updateAppointmentDuration(duration: number) {
        return this.settingsModel.findOneAndUpdate({}, { duration: duration }, { new: true })
    }

    async getDaySchedules() {
        let daySchedules = await this.dayScheduleModel.find({}).exec()
        return daySchedules;
    }

    async getWeekSchedules() {
        let weekSchedules = await this.weekScheduleModel.find({}).exec()

        return weekSchedules
    }

    async getMonthSchedules() {
        let monthSchedules = await this.monthScheduleModel.find({}).exec()

        return monthSchedules
    }

    async createDaySchedule(daySchedule: DayScheduleDto) {
        let settings = await this.settingsModel.findOne().exec()
        let settDuration = settings.defaultDuration

        let timeslots: {
            from: number;
            to: number;
            duration: number;
        }[] = []

        let pauses = daySchedule.pauses;
        let from = daySchedule.from
        let to = daySchedule.to

        pauses.unshift({ from: from, to: from })
        pauses.push({ from: to, to: to })

        pauses.forEach((pause, i, pausesArr) => {
            let nextPause = pausesArr[i + 1]
            if (!nextPause) {
                return;
            }

            let range = { from: pause.to, to: nextPause.from }

            let slotsCount = Math.round((range.to - range.from) / settDuration)

            for (let j = 0; j < slotsCount; j++) {
                timeslots.push({
                    from: range.from + j * settDuration,
                    to: range.from + ((j + 1) * settDuration),
                    duration: settDuration
                })
            }

        })

        let newDaySchedule = await this.dayScheduleModel.create({
            timeslots: timeslots
        })

        settings.daySchedules.push(newDaySchedule._id)
        await settings.save()

        return newDaySchedule;
    }

    async createWeekSchedule(weekSchedule: WeekScheduleDto) {
        let days = new Map<DayOfWeek, string>()
        let day = weekSchedule[0];

        days[DayOfWeek.Monday] = weekSchedule[0]

        for (let i = 1; i < 5; i++) {
            let iStr = i.toString()
            if (weekSchedule[i]) {
                days[iStr] = weekSchedule[i]
                day = weekSchedule[i]
                continue;
            }

            days[iStr] = day
        }

        if(weekSchedule[DayOfWeek.Sunday]){
            days[DayOfWeek.Sunday] = weekSchedule[DayOfWeek.Sunday]
        }

        if(weekSchedule[DayOfWeek.Saturday]){
            days[DayOfWeek.Saturday] = weekSchedule[DayOfWeek.Saturday]
        }

        return this.weekScheduleModel.create({
            days: days
        })
    }

    async createMonthSchedule(monthSchedule: MonthScheduleDto) {
        let weeks = new Map<WeekOfMonth, string>()
        let week = monthSchedule[0];

        weeks[WeekOfMonth.First] = monthSchedule[0]

        for (let i = 1; i < 4; i++) {
            let iStr = i.toString()
            if (monthSchedule[i]) {
                weeks[iStr] = monthSchedule[i]
                week = monthSchedule[i]
                continue;
            }

            weeks[iStr] = week
        }

        return this.monthScheduleModel.create({
            weeks: weeks
        })
    }
}
