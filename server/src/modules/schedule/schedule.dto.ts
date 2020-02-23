// export class CreateScheduleDto {
//     JanuaryOptId: string;
//     FebruaryOptId?: string;
//     MarchOptId?: string;
//     AprilOptId?: string;
//     MayOptId?: string;
//     JuneOptId?: string;
//     JulyOptId?: string;
//     AugustOptId?: string;
//     SeptemberOptId?: string;
//     OctoberOptId?: string;
//     NovemberOptId?: string;
//     DecemberOptId?: string;
// }

import { MonthOfYear } from "src/models/schedule";

export type CreateScheduleDto = {
    [key in MonthOfYear]?: string;
};