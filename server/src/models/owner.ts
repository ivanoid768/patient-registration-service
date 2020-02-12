import * as mongoose from 'mongoose';
import * as isemail from 'isemail';
import { UserModel } from './users';

export namespace Owner {
    export interface IOwner extends mongoose.Document {
        __t: string;
        name: string;
        surname: string;
        middlename?: string;
        phone?: string;
        email?: string;
    }

    export const OwnerToken = 'OwnerDIToken'

    export const OwnerSchema = UserModel.discriminator('Owner', new mongoose.Schema({})).schema;

    OwnerSchema.pre('save', async function () {
        const self: IOwner = this as IOwner;
        console.log('OwnerSchema.pre.save')

        if (!self.email && !self.phone) {
            throw new Error(`Owner should have at least phone or email!`)
        }
    })

}
