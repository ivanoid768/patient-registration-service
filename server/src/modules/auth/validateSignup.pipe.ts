import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Inject } from '@nestjs/common';
import { CreateUserInput, CreateUserDto } from './signup.dto';
import { UserServiceToken } from '../../common/IoC_Tokens';
import { IUserService } from './auth.service';

@Injectable()
export class SignupValidationPipe implements PipeTransform {
    constructor(@Inject(UserServiceToken) private readonly userService: IUserService) { }

    async transform(value: CreateUserInput, metadata: ArgumentMetadata) {

        if(value.password != value.passConfirm){
            throw new BadRequestException(`Password and password confirmation must be equal`);
        }

        const hasUser = await this.userService.hasUser(value)

        if (hasUser) {
            throw new BadRequestException(`User with email ${value.email} exists already`);
        }
        return value as CreateUserDto;
    }
}
