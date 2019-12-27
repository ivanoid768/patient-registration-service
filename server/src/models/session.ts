import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export namespace Session {
    export interface ISession extends mongoose.Document {
        userId: string;
        token: string;
        startAt?: number;
    }

    export const SessionToken = 'SessionModelDIToken'
}

export const SessionSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    token: {
        type: String,
        required: true,
        trim: true
    },
    startAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
});