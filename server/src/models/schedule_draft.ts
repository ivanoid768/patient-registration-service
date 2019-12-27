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

export namespace ScheduleDraft {
    export interface IScheduleDraft extends mongoose.Document {
        timeslot: {
            duration: number; // minutes
        }[];
        monthSchedules: IMonthSchedule[]; // max 12
    }

    export const ScheduleDraftToken = 'ScheduleDraftDIToken';

    export const ScheduleDraftSchema = new mongoose.Schema({

    })

}



