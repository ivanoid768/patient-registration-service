import * as mongoose from 'mongoose';
import * as isemail from 'isemail';
import { UserModel } from './users';

export namespace Receptionist {
    export interface IReceptionist extends mongoose.Document {
        name: string;
        surname: string;
        middlename?: string;
        phone?: string;
        email?: string;
    }

    export const ReceptionistToken = 'ReceptionistDIToken'

    export const ReceptionistSchema = UserModel.discriminator('Receptionist', new mongoose.Schema({})).schema;

    ReceptionistSchema.pre('save', async function () {
        const self: IReceptionist = this as IReceptionist;
        console.log('ReceptionistSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Receptionist should have at least phone or email!`)
        }
    })

    // export { ReceptionistSchema } // Export declarations are not permitted in a namespace.
}
