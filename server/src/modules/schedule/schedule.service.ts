import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScheduleSettings, DaySchedule, WeekSchedule, MonthSchedule, WeekOfMonth, DayOfWeek } from 'src/models/schedule_settings';
import { Schedule, MonthOfYear } from 'src/models/schedule';
import { Appointment } from 'src/models/appointment';
import { CreateScheduleDto } from './schedule.dto';
import { fillMapGapes, buildNewAppointment } from './schedule.utils';
import { Doctor } from 'src/models/doctor';

@Injectable()
export class ScheduleService {
    constructor(
        @InjectModel(Schedule.ScheduleToken) private readonly scheduleModel: Model<Schedule.ISchedule>,
        @InjectModel(Appointment.AppointmentToken) private readonly appointmentModel: Model<Appointment.IAppointment>,
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

        let appointments = await this.appointmentModel.insertMany(appointmentDataList)
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

}
