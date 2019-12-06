import * as mongoose from "mongoose";

export namespace Appointment {
    export interface IAppointment extends mongoose.Document {
        doctor: mongoose.Types.ObjectId;
        patient: mongoose.Types.ObjectId;
        date: {
            from: Date;
            to: Date;
        },
        notes: string;
        scheduleId: mongoose.Schema.Types.ObjectId;
    }

    export const AppointmentToken = 'AppointmentDIToken';

    export const AppointmentSchema = new mongoose.Schema({
        doctor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true
        },
        patient:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true
        },
        date: {
            from:{
                type:Date,
                required: true
            },
            to:{ 
                type: Date,
                required: true
            }
        },
        notes:{
            type: String,
            default: '',
            required: true
        },
        scheduleId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        }
    })

}



