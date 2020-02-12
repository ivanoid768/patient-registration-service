import * as mongoose from 'mongoose';
import * as isemail from 'isemail';

export enum Role {
    User = 'User',
    Admin = 'Admin',
    SuperAdmin = 'SuperAdmin'
}

export namespace User {
    export interface IUser extends mongoose.Document {
        name: string;
        surname: string;
        middlename?: string;
        email: string;
        phone: string;
        password: string;
        role: Role;
        confirmed: boolean;
    }

    export const UserToken = 'UserModelDIToken'
    export const UserCollectionName = 'users'
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
        index: {
            unique: true
        }
    },
    phone: {
        type: String,
        trim: true,
        match: /^[+]{0,1}\d{6,11}$/i,
        set: ((phone: string) => {
            return phone.replace(/(-|\s)/i, '')
        })
    },
    password: {
        type: String,
        required: true,
        // match: /^[a-zA-Z0-9$@$!%*?&#^-_.+]{8,}$/i
    },
    role: {
        type: Role,
        required: true,
        enum: ['Admin', 'User', 'SuperAdmin']
    },
    confirmed:{
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: false
    },
});

export const UserModel = mongoose.model<User.IUser>('User', UserSchema); 