import { Role } from "src/models/users";

export class CreateUserDto {
    readonly name: string;
    readonly sirname: string;
    readonly middlename?: string;
    readonly email: string;
    readonly phone: string;
    readonly password: string;
    readonly role: Role
}

export class CreateUserInput extends CreateUserDto{
    readonly passConfirm: string;
}