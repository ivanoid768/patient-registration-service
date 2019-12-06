import * as mongoose from "mongoose";

export namespace Timeslot {
    export interface ITimeslot extends mongoose.Document {
        date: {
            from: Date;
            to: Date;
        },
        appointment?: mongoose.Schema.Types.ObjectId;
        scheduleId: mongoose.Schema.Types.ObjectId;
    }

    export const TimeslotToken = 'TimeslotDIToken';

    export const TimeslotSchema = new mongoose.Schema({
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Appointment'
        },
        date: {
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: true
            }
        },
        scheduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    })

}



