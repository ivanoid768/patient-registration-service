import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner } from '../../models/owner';
import { Doctor } from '../../models/doctor';
import { UserSchema, User } from '../../models/users';
import { Receptionist } from '../../models/receptionist';
import { OwnerService } from './owner.service';
import { UserService } from './user.service';
import { DoctorService } from './doctor.service';
import { ReceptionistService } from './receptionists/receptionist.service';
import { OwnerController } from './owner.controller';
import { DoctorController } from './doctor.controller';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth/auth.module';
import { ReceptionistResolver } from './receptionists/receptionist.resolver';
import { ReceptController } from './receptionists/receptionist.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Owner.OwnerToken,
            schema: Owner.OwnerSchema
        },
        {
            name: Doctor.DoctorToken,
            schema: Doctor.DoctorSchema
        },
        {
            name: User.UserToken,
            schema: UserSchema
        },
        {
            name: Receptionist.ReceptionistToken,
            schema: Receptionist.ReceptionistSchema
        }]),
        AuthModule
    ],
    providers: [OwnerService, UserService, DoctorService, ReceptionistService,
        UserResolver, ReceptionistResolver
    ],
    controllers: [ OwnerController, DoctorController, ReceptController]
})
export class UsersModule { }
