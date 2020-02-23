import { Schema, Document } from "mongoose";

export enum MonthOfYear {
    January = '0',
    February = '1',
    March = '2',
    April = '3',
    May = '4',
    June = '5',
    July = '6',
    August = '7',
    September = '8',
    October = '9',
    November = '10',
    December = '11',
}

export namespace Schedule {
    export interface ISchedule extends Document {
        id: string;
        name: string;
        draft: boolean;
        months: Map<MonthOfYear, string>
        appointments: Schema.Types.ObjectId[]
    }

    export const ScheduleToken = 'ScheduleDIToken';

    export const ScheduleSchema = new Schema({
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        draft: {
            type: Schema.Types.Boolean,
            required: true,
            default: true
        },
        months: {
            type: Schema.Types.Map,
            of: Schema.Types.ObjectId,
            required: true,
        },
        appointments: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        }
    })

}



