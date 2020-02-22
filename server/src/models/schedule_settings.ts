import { Schema, Document } from "mongoose";

export enum DayOfWeek {
    Monday = '0',
    Tuesday = '1',
    Wednesday = '2',
    Thursday = '3',
    Friday = '4',
    Saturday = '5',
    Sunday = '6',
}

export enum WeekOfMonth {
    First = '0',
    Second = '1',
    Third = '3',
    Forth = '4',
}

// export type IWeekSchedule = {
//     [key in DayOfWeek]: string;
// };

// export type IMonthSchedule = {
//     [key in WeekOfMonth]: string;
// }

export namespace DaySchedule {
    export interface IDaySchedule extends Document {
        id: string;
        timeslots: {
            from: number; // time from start of the day in milliseconds
            to: number;
            duration: number; // minutes
        }[]
        duration: number; // minutes
    }

    export const DayScheduleToken = 'DayScheduleDIToken';

    export const DayScheduleSchema = new Schema({
        timeslots: {
            type: [new Schema({
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
}

export namespace WeekSchedule {
    export interface IWeekSchedule extends Document {
        id: string;
        days: Map<DayOfWeek, string>;
    }

    export const WeekScheduleToken = 'WeekScheduleDIToken';

    export const WeekScheduleSchema = new Schema({
        days: {
            type: Schema.Types.Map,
            of: Schema.Types.ObjectId, // TODO: In Mongoose Maps, keys must be strings in order to store the document in MongoDB.
            required: true,
            // default: new Map<DayOfWeek, string>()
        }
    })
}

export namespace MonthSchedule {
    export interface IMonthSchedule extends Document {
        id: string;
        weeks: Map<WeekOfMonth, string>;
    }

    export const MonthScheduleToken = 'MonthScheduleDIToken';

    export const MonthScheduleSchema = new Schema({
        weeks: {
            type: Schema.Types.Map,
            of: Schema.Types.ObjectId,
            required: true,
            // default: new Map<WeekOfMonth, string>()
        }
    })
}

export namespace ScheduleSettings {
    export interface IScheduleSettings extends Document {
        // timeslot: {
        //     duration: number; // minutes
        // }[];
        daySchedules: Schema.Types.ObjectId[];
        weekSchedules: Schema.Types.ObjectId[];
        monthSchedules: Schema.Types.ObjectId[];
        defaultDuration: number;
    }

    export const ScheduleSettingsToken = 'ScheduleSettingsDIToken';

    export const ScheduleSettingsSchema = new Schema({
        duration: {
            type: Number,
            required: true,
            default: 15,
        },
        daySchedules: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        weekSchedules: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
        monthSchedules: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
    })

}



