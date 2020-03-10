import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { DaySchedule, WeekSchedule, MonthSchedule, WeekOfMonth, DayOfWeek } from 'src/models/schedule_settings';
import { Schedule, MonthOfYear } from 'src/models/schedule';
import { Appointment } from 'src/models/appointment';
import { CreateScheduleDto } from './schedule.dto';
import { fillMapGapes, buildNewAppointment, buildAppointmentsForRestDaysOfMonth } from './schedule.utils';
import { Doctor } from 'src/models/doctor';
import { Timeslot } from 'src/models/timeslot';
import { IScheduleWithAppointments } from './schedule.types';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel(Schedule.ScheduleToken) private readonly scheduleModel: Model<Schedule.ISchedule>,
        @InjectModel(Appointment.AppointmentToken) private readonly appointmentModel: Model<Appointment.IAppointment>,
        @InjectModel(Timeslot.TimeslotToken) private readonly timeslotModel: Model<Timeslot.ITimeslot>,
        @InjectModel(DaySchedule.DayScheduleToken) private readonly dayScheduleModel: Model<DaySchedule.IDaySchedule>,
        @InjectModel(WeekSchedule.WeekScheduleToken) private readonly weekScheduleModel: Model<WeekSchedule.IWeekSchedule>,
        @InjectModel(MonthSchedule.MonthScheduleToken) private readonly monthScheduleModel: Model<MonthSchedule.IMonthSchedule>,
        @InjectModel(Doctor.DoctorToken) private readonly doctorModel: Model<Doctor.IDoctor>,
    ) { }

    async createSchedule(inputSchedule: CreateScheduleDto) {
        let fullInput = fillMapGapes<MonthOfYear, string>(inputSchedule, 12)

        let newSchedule = await this.scheduleModel.create({
            name: 'name' + Math.random(),
            draft: true,
            months: fullInput,
        })

        let appointmentDataList: {}[] = []

        let revInput = new Map<string, MonthOfYear>()

        fullInput.forEach((val, key) => {
            revInput.set(val, key)
        })

        let monthIds = Array.from(fullInput.values())
        let monthScheduleList = await this.monthScheduleModel.find({ _id: { $in: monthIds } }).exec()

        for (const monthSchedule of monthScheduleList) {
            let weekIds = Array.from(monthSchedule.weeks.values())
            let monthName = revInput.get(monthSchedule.id)

            let revWeeks = new Map<string, WeekOfMonth>()
            monthSchedule.weeks.forEach((val, key) => {
                revWeeks.set(val, key)
            })

            let weekScheduleList = await this.weekScheduleModel.find({ _id: { $in: weekIds } }).exec()
            let restAppointments = await buildAppointmentsForRestDaysOfMonth(
                monthName,
                weekScheduleList.find(weekSchedule => weekSchedule.id === monthSchedule.weeks.get(WeekOfMonth.First)),
                weekScheduleList.find(weekSchedule => weekSchedule.id === monthSchedule.weeks.get(WeekOfMonth.Forth)),
                this.dayScheduleModel
            )

            appointmentDataList.push(...restAppointments.map(restAppointment => ({
                ...restAppointment,
                scheduleId: newSchedule._id
            })))

            for (const weekSchedule of weekScheduleList) {
                let dayIds = Array.from(weekSchedule.days.values())
                let weekName = revWeeks.get(weekSchedule.id)

                let revDays = new Map<string, DayOfWeek>()
                weekSchedule.days.forEach((val, key) => {
                    revDays.set(val, key)
                })

                let dayScheduleList = await this.dayScheduleModel.find({ _id: { $in: dayIds } }).exec()

                for (const daySchedule of dayScheduleList) {
                    let timeslots = daySchedule.timeslots;
                    let dayName = revDays.get(daySchedule.id)

                    for (const timeslot of timeslots) {

                        let newAppointmentData = buildNewAppointment(timeslot, dayName, weekName, monthName)

                        appointmentDataList.push({
                            ...newAppointmentData,
                            scheduleId: newSchedule._id
                        })

                    }

                }

            }

        }

        let appointments = await this.timeslotModel.insertMany(appointmentDataList)
        let appointmentIds = appointments.map(appointment => appointment._id)

        newSchedule.appointments = appointmentIds;
        await newSchedule.save()

        return newSchedule;
    }

    async assignSchedule(scheduleId: string, doctorIds: string[]) {
        let updateResult = await this.doctorModel.updateMany({ _id: { $in: doctorIds } }, { schedule: scheduleId })

        return this.scheduleModel.findById(scheduleId)
    }

    async getDoctors(scheduleId: string) {
        return this.doctorModel.find({ schedule: scheduleId })
    }

    async getById(id: string) {
        return this.scheduleModel.findById(id)
    }

    async getDoctorSchedule(doctorId: string) {
        let doctor = await this.doctorModel.findById(doctorId).exec()
        if (!doctor) {
            throw new Error(`invalid_doctor_id:${doctorId}`)
        }

        let schedule = await this.scheduleModel.findById(doctor.schedule).exec()
        if (!schedule) {
            throw new Error(`invalid_schedule_id:${doctor.schedule}`)
        }

        let scheduleWithAppointments: IScheduleWithAppointments[] = await this.scheduleModel.aggregate([
            {
                $match: {
                    _id: schedule._id
                }
            },
            {
                $lookup:
                {
                    from: this.timeslotModel.collection.name,
                    localField: 'appointments',
                    foreignField: '_id',
                    as: 'timeslots',
                },
            },
            {
                $unwind: '$timeslots'
            },
            {
                $lookup:
                {
                    from: this.appointmentModel.collection.name,
                    let: { timeslots: "$timeslots", doctor: doctorId },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and:
                                        [
                                            { $eq: ["$doctor", "$$doctor"] },
                                            { $eq: ["$timeslot", "$$timeslots._id"] }
                                        ]
                                }
                            },

                        },
                    ],
                    as: 'timeslots.appointment'
                }
            },
            {
                $addFields: {
                    'timeslots.appointment': { $arrayElemAt: ['$timeslots.appointment', 0] }
                }
            },
            {
                $sort: {
                    'timeslots.date.from': 1
                }
            },
            {
                $group: {
                    _id: '$_id',
                    name: '$name',
                    draft: '$draft',
                    months: '$months',
                    timeslots: { $push: '$timeslots' },
                }
            }
        ])

        return {
            schedule,
            scheduleWithAppointments: scheduleWithAppointments[0],
        }
    }

}
