import { DayOfWeek, WeekOfMonth } from "src/models/schedule_settings";
import { MonthOfYear } from "src/models/schedule";
import { ITimeslot } from "./schedule.types";
import { getYear, getDaysInMonth, startOfYear, addMonths, addWeeks, addDays, addMilliseconds } from 'date-fns'

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

    let date = startOfYear(now)
    date = addMonths(date, parseInt(monthName))
    date = addWeeks(date, parseInt(weekName))
    date = addDays(date, parseInt(dayName))
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

export const buildAppointmentsForRestDaysOfMonth = () => {
    // TODO: generate appointments for day of month that don't included in any of four weeks!

}