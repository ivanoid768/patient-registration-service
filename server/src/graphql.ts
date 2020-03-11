
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    User = "User",
    Admin = "Admin",
    SuperAdmin = "SuperAdmin"
}

export class CreateDoctorInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
    specialization: string;
}

export class CreateOwnerInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
}

export class CreateReceptionistInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
}

export class CreateScheduleInput {
    JanuaryOptId: string;
    FebruaryOptId?: string;
    MarchOptId?: string;
    AprilOptId?: string;
    MayOptId?: string;
    JuneOptId?: string;
    JulyOptId?: string;
    AugustOptId?: string;
    SeptemberOptId?: string;
    OctoberOptId?: string;
    NovemberOptId?: string;
    DecemberOptId?: string;
}

export class DayScheduleInput {
    from: string;
    to: string;
}

export class MonthScheduleInput {
    firstWeekOptId: string;
    secondWeekOptId?: string;
    thirdWeekOptId?: string;
    fourthWeekOptId?: string;
}

export class Pause {
    from: string;
    to: string;
}

export class WeekScheduleInput {
    MondayDayOptId: string;
    TuesdayDayOptId?: string;
    WednesdayDayOptId?: string;
    ThursdayDayOptId?: string;
    FridayDayOptId?: string;
    SaturdayDayOptId?: string;
    SundayDayOptId?: string;
}

export class AddDayScheduleOptResp {
    daySchedule: DayScheduleOpt;
    nextStep: string;
}

export class AddMonthScheduleOptResp {
    monthScheduleOpt: MonthScheduleOpt;
    nextStep: string;
    prevStep: string;
}

export class AddWeekScheduleOptResp {
    weekScheduleOpt: WeekScheduleOpt;
    nextStep: string;
    prevStep: string;
}

export class Appointment {
    free: boolean;
    doctor: Doctor;
    patient: Patient;
    from: string;
    to: string;
    notes: string;
    timeslot: Timeslot;
    schedule: Schedule;
}

export class DayScheduleOpt {
    id: string;
    timeslots: TimeRange[];
}

export class Doctor {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
    confirmed?: boolean;
    specialization: string;
}

export class MonthScheduleOpt {
    id: string;
    firstWeek: WeekScheduleOpt;
    secondWeek: WeekScheduleOpt;
    thirdWeek: WeekScheduleOpt;
    fourthWeek: WeekScheduleOpt;
}

export abstract class IMutation {
    abstract cancelAppointment(id: string): Appointment | Promise<Appointment>;

    abstract rearrangeAppointment(appointmentId: string, timeslotId: string): Appointment | Promise<Appointment>;

    abstract setAppointmentDuration(duration: number): ScheduleSettings | Promise<ScheduleSettings>;

    abstract addDayScheduleOpt(input: DayScheduleInput, pauses: Pause[]): AddDayScheduleOptResp | Promise<AddDayScheduleOptResp>;

    abstract addWeekScheduleOpt(input: WeekScheduleInput): AddWeekScheduleOptResp | Promise<AddWeekScheduleOptResp>;

    abstract addMonthScheduleOpt(input: MonthScheduleInput): AddMonthScheduleOptResp | Promise<AddMonthScheduleOptResp>;

    abstract createSchedule(input: CreateScheduleInput): Schedule | Promise<Schedule>;

    abstract assignSchedule(scheduleId: string, doctors: string[]): Schedule | Promise<Schedule>;

    abstract addDoctor(input: CreateDoctorInput): Doctor | Promise<Doctor>;

    abstract removeDoctor(id: string): Doctor | Promise<Doctor>;

    abstract addOwner(input: CreateOwnerInput): Owner | Promise<Owner>;

    abstract removeOwner(id: string): Owner | Promise<Owner>;

    abstract confirmOwner(id: string): User | Promise<User>;

    abstract addReceptionist(input: CreateReceptionistInput): Receptionist | Promise<Receptionist>;

    abstract removeReceptionist(id: string): Receptionist | Promise<Receptionist>;

    abstract _empty(): string | Promise<string>;

    abstract confirm(id: string): User | Promise<User>;

    abstract makeAdmin(id: string): User | Promise<User>;
}

export class Owner {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
    confirmed?: boolean;
}

export class Patient {
    name: string;
    surname: string;
    middlename?: string;
    phone?: string;
    email?: string;
}

export abstract class IQuery {
    abstract getFreeAppointmentList(doctorId: string): Timeslot[] | Promise<Timeslot[]>;

    abstract scheduleSettings(): ScheduleSettings | Promise<ScheduleSettings>;

    abstract daySheduleList(): DayScheduleOpt[] | Promise<DayScheduleOpt[]>;

    abstract weekSheduleList(): WeekScheduleOpt[] | Promise<WeekScheduleOpt[]>;

    abstract monthSheduleList(): MonthScheduleOpt[] | Promise<MonthScheduleOpt[]>;

    abstract getDoctorSchedule(doctorId: string): Schedule | Promise<Schedule>;

    abstract listDoctor(search?: string): Doctor[] | Promise<Doctor[]>;

    abstract listOwner(search?: string): Owner[] | Promise<Owner[]>;

    abstract listReceptionist(search?: string): Receptionist[] | Promise<Receptionist[]>;

    abstract me(): User | Promise<User>;
}

export class Receptionist {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
    confirmed?: boolean;
}

export class Schedule {
    id: string;
    timeslots: Timeslot[];
    doctors: Doctor[];
    monthScheduleOptList: MonthScheduleOpt[];
    creator: User;
    createdAt: string;
}

export class ScheduleSettings {
    appointmentDuration: number;
}

export class TimeRange {
    from: string;
    to: string;
}

export class Timeslot {
    from: string;
    to: string;
    doctors: Doctor[];
    schedule: Schedule;
    appointment?: Appointment;
}

export class User {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
}

export class WeekScheduleOpt {
    id: string;
    Monday: DayScheduleOpt;
    Tuesday: DayScheduleOpt;
    Wednesday: DayScheduleOpt;
    Thursday: DayScheduleOpt;
    Friday: DayScheduleOpt;
    Saturday: DayScheduleOpt;
    Sunday: DayScheduleOpt;
}
