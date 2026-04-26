import { ClientStatus } from "../../../generated/prisma/enums";

export interface Client {
    id: string;
    email?: string;
    status: ClientStatus;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    name: string;
    company?:string
    userId:string;
}


export type ClientResponse = Pick<Client, "id" | "name" | "email" | "company" | "status" | "userId">;
