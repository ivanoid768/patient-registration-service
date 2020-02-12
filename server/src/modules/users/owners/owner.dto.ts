import { CreateUserDto } from "../user.dto";

export class CreateOwnerDto extends CreateUserDto {
    
}

export class CreateOwnerInput extends CreateOwnerDto {
    readonly passConfirm: string;
}