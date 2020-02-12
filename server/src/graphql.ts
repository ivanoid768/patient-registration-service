
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum Role {
    User = "User",
    Admin = "Admin",
    SuperAdmin = "SuperAdmin"
}

export class CreateDoctorInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
    specialization: string;
}

export class CreateOwnerInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
}

export class CreateReceptionistInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
}

export class Doctor {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
    confirmed?: boolean;
    specialization: string;
}

export abstract class IMutation {
    abstract addDoctor(input: CreateDoctorInput): Doctor | Promise<Doctor>;

    abstract removeDoctor(id: string): Doctor | Promise<Doctor>;

    abstract addOwner(input: CreateOwnerInput): Owner | Promise<Owner>;

    abstract removeOwner(id: string): Owner | Promise<Owner>;

    abstract confirmOwner(id: string): User | Promise<User>;

    abstract addReceptionist(input: CreateReceptionistInput): Receptionist | Promise<Receptionist>;

    abstract removeReceptionist(id: string): Receptionist | Promise<Receptionist>;

    abstract _empty(): string | Promise<string>;

    abstract confirm(id: string): User | Promise<User>;

    abstract makeAdmin(id: string): User | Promise<User>;
}

export class Owner {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
    confirmed?: boolean;
}

export abstract class IQuery {
    abstract listDoctor(search?: string): Doctor[] | Promise<Doctor[]>;

    abstract listOwner(search?: string): Owner[] | Promise<Owner[]>;

    abstract listReceptionist(search?: string): Receptionist[] | Promise<Receptionist[]>;

    abstract me(): User | Promise<User>;
}

export class Receptionist {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
    confirmed?: boolean;
}

export class User {
    id: string;
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    role: Role;
}
