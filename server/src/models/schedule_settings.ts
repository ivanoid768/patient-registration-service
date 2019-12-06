import * as mongoose from "mongoose";

interface IDaySchedule {
    timeslots: {
        dateFrom: Date; // TODO: only time of day.
        duration: number; // minutes
    }[]
}

interface IWeekSchedule {
    days:IDaySchedule[] // max 7
}

interface IMonthSchedule {
    weeks: IWeekSchedule[] // max 4 ?
}

export namespace ScheduleSettings {
    export interface IScheduleSettings extends mongoose.Document {
        timeslot: {
            duration: number; // minutes
        }[];
        daySchedules: IDaySchedule[];
        weekSchedules: IWeekSchedule[];
        monthSchedules: IMonthSchedule[];
    }

    export const ScheduleSettingsToken = 'ScheduleSettingsDIToken';

    export const ScheduleSettingsSchema = new mongoose.Schema({

    })

}



