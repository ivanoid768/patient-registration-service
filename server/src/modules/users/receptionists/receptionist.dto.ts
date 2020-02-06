import { Role } from "src/models/users";
import { CreateUserDto } from "../user.dto";

export class CreateReceptionistDto extends CreateUserDto {

}

export class CreateReceptionistInput extends CreateReceptionistDto {
    readonly passConfirm: string;
}