import * as mongoose from 'mongoose';
import * as isemail from 'isemail';

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
    phone: string;
    password: string;
    role: Role;
}

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        required: true,
        trim: true
    },
    middlename: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email: string) => {
                return isemail.validate(email)
            },
            msg: `Error. Email must be valid e-mail address!`
        },
        lowercase: true,
        index:{
            unique: true
        }
    },
    phone: {
        type: String,
        trim: true,
        match: /^[+]?[0-9-]{5,}$/i,
        index:{
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        // match: /^[a-zA-Z0-9$@$!%*?&#^-_.+]{8,}$/i
    },
    role: {
        type: Role,
        enum: ['Owner', 'Receptionist', 'Doctor']
    }
});