import * as mongoose from "mongoose";

export namespace Schedule {
    export interface ISchedule extends mongoose.Document {
        name: string;
        draft: boolean;
    }

    export const ScheduleToken = 'ScheduleDIToken';

    export const ScheduleSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        draft: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
            default: false
        }
    })

}



