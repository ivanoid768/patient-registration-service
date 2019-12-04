import * as mongoose from 'mongoose';
import * as isemail from 'isemail';
import { async } from 'rxjs/internal/scheduler/async';

export namespace Owner {
    export interface IOwner extends mongoose.Document {
        name: string;
        surname: string;
        middlename?: string;
        phone?: string;
        email?: string;
    }

    export const OwnerToken = 'OwnerDIToken'

    export const OwnerSchema = new mongoose.Schema({
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

    OwnerSchema.pre('save', async function () {
        const self: IOwner = this as IOwner;
        console.log('OwnerSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Owner should have at least phone or email!`)
        }
    })

    // export { OwnerSchema } // Export declarations are not permitted in a namespace.
}
