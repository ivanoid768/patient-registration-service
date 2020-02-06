import * as mongoose from 'mongoose';
import * as isemail from 'isemail';
import { UserModel } from './users';

export namespace Doctor {
    export interface IDoctor extends mongoose.Document {
        name: string;
        surname: string;
        middlename?: string;
        phone?: string;
        email?: string;
        specialization: string;
        schedule?: mongoose.Types.ObjectId
    }

    export const DoctorToken = 'DoctorDIToken'

    export const DoctorSchema = UserModel.discriminator('Doctor', new mongoose.Schema({
        specialization: {
            type: String,
            trim: true,
            lowercase: true
        },
        schedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule'
        }
    })).schema;

    DoctorSchema.pre('save', async function () {
        const self: IDoctor = this as IDoctor;
        console.log('DoctorSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Doctor should have at least phone or email!`)
        }
    })

}
