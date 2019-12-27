import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner } from 'src/models/owner';
import { Doctor } from 'src/models/doctor';
import { UserSchema, User } from 'src/models/users';
import { Receptionist } from 'src/models/receptionist';
import { OwnerService } from './owner.service';
import { UserService } from './user.service';
import { DoctorService } from './doctor.service';
import { ReceptionistService } from './receptionist.service';
import { ReceptionistController } from './receptionist.controller';
import { OwnerController } from './owner.controller';
import { DoctorController } from './doctor.controller';
import { UserResolver } from './user.resolver';

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
        }])
    ],
    providers: [OwnerService, UserService, DoctorService, ReceptionistService,
        UserResolver
    ],
    controllers: [ReceptionistController, OwnerController, DoctorController]
})
export class UsersModule { }
