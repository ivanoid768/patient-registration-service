import { DayOfWeek, WeekOfMonth, WeekSchedule, DaySchedule } from "src/models/schedule_settings";
import { MonthOfYear } from "src/models/schedule";
import { ITimeslot } from "./schedule.types";
import { startOfYear, addMonths, addWeeks, addDays, addMilliseconds, getDay } from 'date-fns'
import { Model } from "mongoose";
import { async } from "rxjs/internal/scheduler/async";

export const fillMapGapes = <K, V>(input: any, length: number) => {
    let day = input[0];
    let theMap = new Map<K, V>()

    theMap['0'] = input[0]

    for (let i = 1; i < length; i++) {
        let iStr = i.toString()
        if (input[i]) {
            theMap[iStr] = input[i]
            day = input[i]
            continue;
        }

        theMap[iStr] = day
    }

    return theMap;
}

export const buildNewAppointment = (timeslot: ITimeslot, dayName: DayOfWeek, weekName: WeekOfMonth, monthName: MonthOfYear) => {
    let now = Date.now()
    // TODO: work on weekend days and holidays?
    let date = startOfYear(now)
    date = addMonths(date, parseInt(monthName))
    let weekDay = getDay(date)
    let daysOffset = 7 - weekDay;
    date = addWeeks(date, parseInt(weekName))
    date = addDays(date, parseInt(dayName))
    date = addDays(date, daysOffset)
    let from = addMilliseconds(date, timeslot.from)
    let to = addMilliseconds(date, timeslot.to)

    return {
        free: true, // TODO: remove?
        date: {
            from: from,
            to: to,
        }
    }
}

export const buildAppointmentsForRestDaysOfMonth = async (
    monthName: MonthOfYear,
    firstWeek: WeekSchedule.IWeekSchedule,
    lastWeek: WeekSchedule.IWeekSchedule,
    dayScheduleModel: Model<DaySchedule.IDaySchedule>
) => {
    // Generate appointments for day of month that don't included in any of four weeks.
    // TODO: Now for first few days the system generates schedule based on first week schedule and for last few days on last week schedule of the month.
    // Is it right behavior?
    let now = Date.now()
    let date = startOfYear(now)
    date = addMonths(date, parseInt(monthName))

    let weekDay = getDay(date)
    let daysOffset = 7 - weekDay

    let appointments: any[] = []

    for (let i = weekDay - 1, j = 0; i < 7; i++, j++) {
        let dayId = firstWeek.days.get(DayOfWeek[i])
        let daySchedule = await dayScheduleModel.findById(dayId).exec()

        daySchedule.timeslots.forEach(timeslot => {
            date = addDays(date, j)
            let from = addMilliseconds(date, timeslot.from)
            let to = addMilliseconds(date, timeslot.to)

            appointments.push({
                date: {
                    from: from,
                    to: to,
                }
            })
        })

    }

    date = addDays(date, daysOffset + 28)
    let lastWeekDay = getDay(date)

    for (let i = lastWeekDay - 1, j = 0; i < 7; i++, j++) {
        let dayId = lastWeek.days.get(DayOfWeek[i])
        let daySchedule = await dayScheduleModel.findById(dayId).exec()

        daySchedule.timeslots.forEach(timeslot => {
            date = addDays(date, j)
            let from = addMilliseconds(date, timeslot.from)
            let to = addMilliseconds(date, timeslot.to)

            appointments.push({
                date: {
                    from: from,
                    to: to,
                }
            })
        })
    }

    return appointments;
}