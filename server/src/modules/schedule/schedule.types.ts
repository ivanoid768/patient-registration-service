import { Appointment } from "src/models/appointment";
import { Timeslot } from "src/models/timeslot";
import { MonthOfYear } from "src/models/schedule";

export interface ITimeslot {
    from: number; // time from start of the day in milliseconds
    to: number;
    duration: number; // minutes
}

export interface ITimeslotWithAppointment extends Timeslot.ITimeslot {
    appointment?: Appointment.IAppointment;
}

export interface IScheduleWithAppointments {
    name: string;
    draft: boolean;
    months: Map<MonthOfYear, string>;
    timeslots: ITimeslotWithAppointment[];
}