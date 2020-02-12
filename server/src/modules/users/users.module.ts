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
            schema: Owner.OwnerSchema,
            collection: User.UserCollectionName
        },
        {
            name: Doctor.DoctorToken,
            schema: Doctor.DoctorSchema,
            collection: User.UserCollectionName
        },
        {
            name: User.UserToken,
            schema: UserSchema,
            collection: User.UserCollectionName
        },
        {
            name: Receptionist.ReceptionistToken,
            schema: Receptionist.ReceptionistSchema,
            collection: User.UserCollectionName
        }]),
        AuthModule
    ],
    providers: [OwnerService, UserService, DoctorService, ReceptionistService,
        UserResolver, ReceptionistResolver
    ],
    controllers: [OwnerController, DoctorController, ReceptController]
})
export class UsersModule { }
