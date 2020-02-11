
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum Role {
    Owner = "Owner",
    Receptionist = "Receptionist",
    Doctor = "Doctor"
}

export class CreateReceptionistInput {
    name: string;
    surname: string;
    middlename?: string;
    email?: string;
    phone?: string;
    password: string;
}

export abstract class IMutation {
    abstract addReceptionist(input: CreateReceptionistInput): Receptionist | Promise<Receptionist>;

    abstract confirm(id: string): Receptionist | Promise<Receptionist>;

    abstract _empty(): string | Promise<string>;
}

export abstract class IQuery {
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
