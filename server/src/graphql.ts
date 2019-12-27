
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

export abstract class IQuery {
    abstract me(): User | Promise<User>;
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
