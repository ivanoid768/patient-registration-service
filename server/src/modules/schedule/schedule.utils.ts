import { DayOfWeek, WeekOfMonth } from "src/models/schedule_settings";
import { MonthOfYear } from "src/models/schedule";

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

export const buildNewAppointment = (timeslot: any, dayName: DayOfWeek, weekName: WeekOfMonth, monthName: MonthOfYear) => {

}