import { DayOfWeek, WeekOfMonth } from "src/models/schedule_settings";

export class DayScheduleDto {
    readonly from: number; // from midnight in minutes
    readonly to: number; // from midnight in minutes
    readonly pauses?: {
        from: number;
        to: number;
    }[]
}

export type WeekScheduleDto = {
    [key in DayOfWeek]?: string;
};

export type MonthScheduleDto = {
    [key in WeekOfMonth]?: string;
};