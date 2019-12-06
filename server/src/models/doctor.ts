import * as mongoose from 'mongoose';
import * as isemail from 'isemail';

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

    export const DoctorSchema = new mongoose.Schema({
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
        phone: {
            type: String,
            trim: true,
            match: /^[+]{0,1}\d{6,11}$/i,
            set: ((phone: string) => {
                return phone.replace(/(-|\s)/i, '')
            })
        },
        email: {
            type: String,
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
        specialization:{
            type: String,
            trim: true,
            lowercase: true
        },
        schedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule'
        }
    })

    DoctorSchema.pre('save', async function () {
        const self: IDoctor = this as IDoctor;
        console.log('DoctorSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Doctor should have at least phone or email!`)
        }
    })

}
