import * as mongoose from 'mongoose';
import * as isemail from 'isemail';

export namespace Patient {
    export interface IPatient extends mongoose.Document {
        id: string;
        name: string;
        surname: string;
        middlename?: string;
        phone?: string;
        email?: string;
    }

    export const PatientToken = 'PatientDIToken'

    export const PatientSchema = new mongoose.Schema({
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
        }
    })

    PatientSchema.pre('save', async function () {
        const self: IPatient = this as IPatient;
        console.log('PatientSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Patient should have at least phone or email!`)
        }
    })

    // export { PatientSchema } // Export declarations are not permitted in a namespace.
}
