import * as mongoose from 'mongoose';

export enum Role {
    Owner = 'Owner',
    Receptionist = 'Receptionist',
    Doctor = 'Doctor'
}

export interface IUser extends mongoose.Document {
    name: string;
    surname: string;
    middlename?: string;
    email: string;
    phone: number;
    password: string;
    role: Role;
}

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    middlename: {
        type: String
    },
    email: {
        type: String
    },
    phone:{
        type: Number, //TODO validate isInt
    },
    password: {
        type: String
    },
    role: {
        type: Role,
        enum: ['Owner', 'Receptionist', 'Doctor']
    }
});