import * as mongoose from "mongoose";

export namespace Appointment {
    export interface IAppointment extends mongoose.Document {
        free: boolean;
        doctor: mongoose.Schema.Types.ObjectId;
        patient: mongoose.Schema.Types.ObjectId;
        date: {
            from: Date;
            to: Date;
        },
        notes: string;
        timeslot: mongoose.Schema.Types.ObjectId;
        scheduleId: mongoose.Schema.Types.ObjectId;
    }

    export const AppointmentToken = 'AppointmentDIToken';

    export const AppointmentSchema = new mongoose.Schema({
        free: {
            type: Boolean,
            default: true,
            required: true
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: false
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: false
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
        notes: {
            type: String,
            default: '',
            required: true
        },
        timeslot: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        scheduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    })

}



