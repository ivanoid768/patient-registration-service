import * as mongoose from "mongoose";

export namespace Settings {
    export interface ISettings extends mongoose.Document {
        name: string;
        logo: string;
        description: string;
        owner?: mongoose.Schema.Types.ObjectId;
    }

    export const SettingsToken = 'SettingsDIToken';

    export const SettingsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true,
            default: '/default_logo.png'
        },
        description:{
            type: String,
            required: true,
            default: ''
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner'
        }

    })

}



