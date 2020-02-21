import * as mongoose from "mongoose";
import { Appointment } from "./appointment";

export interface IDaySchedule {
    timeslots: {
        from: number; // TODO: only time of day.
        to: number;
        duration: number; // minutes
    }[]
    duration: number; // minutes
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
        duration: number;
    }

    export const ScheduleSettingsToken = 'ScheduleSettingsDIToken';

    const DayScheduleSchema = new mongoose.Schema({
        timeslots: {
            type: [new mongoose.Schema({
                from: Number,
                to: Number,
                duration: Number,
            })]
        },
        duration: {
            type: Number,
            required: true,
            default: 15
        }
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



