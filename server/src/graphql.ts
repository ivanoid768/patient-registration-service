
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

    abstract removeReceptionist(id: string): Receptionist | Promise<Receptionist>;

    abstract _empty(): string | Promise<string>;

    abstract confirm(id: string): User | Promise<User>;

    abstract makeAdmin(id: string): User | Promise<User>;
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
