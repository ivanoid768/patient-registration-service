import { Resolver, Query, Context, Mutation, Args, Parent, ResolveProperty } from "@nestjs/graphql";
import { ScheduleSettingsService } from "./schedule_settings.service";
import { ScheduleService } from "./schedule.service";
import { DayScheduleDto, WeekScheduleDto, MonthScheduleDto } from "./schedule_settings.dto";
import { CreateScheduleDto } from "./schedule.dto";
import { Schedule } from "src/models/schedule";

@Resolver('Schedule')
export class ScheduleResolver {
    constructor(
        private readonly scheduleSettingsService: ScheduleSettingsService,
        private readonly scheduleService: ScheduleService,
    ) { }

    @Query('scheduleSettings')
    async scheduleSettings() {
        return this.scheduleSettingsService.getSettings()
    }

    @Query('daySheduleList')
    async daySheduleList() {
        return this.scheduleSettingsService.getDaySchedules()
    }

    @Query('weekSheduleList')
    async weekSheduleList() {
        return this.scheduleSettingsService.getWeekSchedules()
    }

    @Query('monthSheduleList')
    async monthSheduleList() {
        return this.scheduleSettingsService.getMonthSchedules()
    }

    @Mutation('setAppointmentDuration')
    async setAppointmentDuration(@Args('duration') duration: number) {
        return this.scheduleSettingsService.updateAppointmentDuration(duration)
    }

    @Mutation('addDayScheduleOpt')
    async addDayScheduleOpt(@Args('input') input: Partial<DayScheduleDto>, @Args('pauses') pauses: any[]) {
        let newDaySchedule = await this.scheduleSettingsService.createDaySchedule({
            from: input.from,
            to: input.to,
            pauses: pauses
        })

        return {
            daySchedule: newDaySchedule,
            nextStep: 'addWeekScheduleOpt'
        }
    }

    @Mutation('addWeekScheduleOpt')
    async addWeekScheduleOpt(@Args('input') input: Partial<WeekScheduleDto>) {
        let newWeekSchedule = await this.scheduleSettingsService.createWeekSchedule(input)

        return {
            weekScheduleOpt: {
                id: newWeekSchedule.id,
                ...newWeekSchedule.days
            },
            prevStep: 'addDayScheduleOpt',
            nextStep: 'addMonthScheduleOpt'
        }
    }

    @Mutation('addMonthScheduleOpt')
    async addMonthScheduleOpt(@Args('input') input: Partial<MonthScheduleDto>) {
        let newMonthSchedule = await this.scheduleSettingsService.createMonthSchedule(input)

        return {
            weekScheduleOpt: {
                id: newMonthSchedule.id,
                ...newMonthSchedule.weeks
            },
            prevStep: 'addWeekScheduleOpt',
            nextStep: 'createSchedule'
        }
    }

    @Mutation('createSchedule')
    async createSchedule(@Args('input') input: Partial<CreateScheduleDto>) {
        let newSchedule = await this.scheduleService.createSchedule(input)

        return newSchedule;
    }

    @Mutation('assignSchedule')
    async assignSchedule(@Args('scheduleId') scheduleId: string, @Args('doctors') doctorIds: string[]) {
        let schedule = await this.scheduleService.assignSchedule(scheduleId, doctorIds)

        return {
            ...schedule,
            monthScheduleOptList: schedule.months,  //TODO: creator, createdAt
        }
    }

    @ResolveProperty('doctors')
    async getScheduleDoctors(@Parent() schedule: Schedule.ISchedule) {
        return this.scheduleService.getDoctors(schedule.id)
    }

    // setAppointmentDuration(duration: Int!): ScheduleSettings! @authRequired(role: Admin)
    // addDayScheduleOpt(input: DayScheduleInput!, pauses: [Pause!]!): AddDayScheduleOptResp! @authRequired(role: Admin)
    // addWeekScheduleOpt(input: WeekScheduleInput!): AddWeekScheduleOptResp! @authRequired(role: Admin)
    // addMonthScheduleOpt(input: MonthScheduleInput!): AddMonthScheduleOptResp! @authRequired(role: Admin)

    // createSchedule(input: CreateScheduleInput!): Schedule! @authRequired(role: Admin)

    // assignSchedule(scheduleId: ID!, doctors: [Doctor!]!): Schedule! @authRequired(role: Admin)


}