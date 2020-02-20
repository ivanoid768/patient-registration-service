import * as mongoose from "mongoose";
import { Appointment } from "./appointment";

export interface IDaySchedule {
    timeslots: {
        dateFrom: Date; // TODO: only time of day.
        duration: number; // minutes
    }[]
    id: String;
    appointments: {
        from: Date;
        to: Date;
    }[]
}

export enum DayOfWeek {
    Sunday = 'Sunday',
    Monday = 'Monday',
}

export enum WeekOfMonth {
    First = 'First',
    Second = 'Second',
    Third = 'Third',
    Forth = 'Forth',
}

export type IWeekSchedule = {
    [key in DayOfWeek]: string;
};

export type IMonthSchedule = {
    [key in WeekOfMonth]: string;
}

export namespace ScheduleSettings {
    export interface IScheduleSettings extends mongoose.Document {
        timeslot: {
            duration: number; // minutes
        }[];
        daySchedules: IDaySchedule[];
        weekSchedules: IWeekSchedule[];
        monthSchedules: IMonthSchedule[];
        diration: number;
    }

    export const ScheduleSettingsToken = 'ScheduleSettingsDIToken';

    const DayScheduleSchema = new mongoose.Schema({
        appointments: {
            type: [new mongoose.Schema({
                from: Date,
                to: Date,
            })]
        },
    })

    export const ScheduleSettingsSchema = new mongoose.Schema({
        duration: {
            type: Number,
            required: true,
            default: 15,
        },
        daySchedules: {
            type: [DayScheduleSchema],
            required: true,
            default: [],
        },
        weekSchedules: {
            type: [Object],
            required: true,
            default: [],
        },
        monthSchedules: {
            type: [Object],
            required: true,
            default: [],
        },
    })

}



