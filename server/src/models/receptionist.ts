import * as mongoose from 'mongoose';
import * as isemail from 'isemail';

export namespace Receptionist {
    export interface IReceptionist extends mongoose.Document {
        name: string;
        surname: string;
        middlename?: string;
        phone?: string;
        email?: string;
    }

    export const ReceptionistToken = 'ReceptionistDIToken'

    export const ReceptionistSchema = new mongoose.Schema({
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

    ReceptionistSchema.pre('save', async function () {
        const self: IReceptionist = this as IReceptionist;
        console.log('ReceptionistSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Receptionist should have at least phone or email!`)
        }
    })

    // export { ReceptionistSchema } // Export declarations are not permitted in a namespace.
}
