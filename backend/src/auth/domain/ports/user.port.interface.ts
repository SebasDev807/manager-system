import { UserRole } from "../../../generated/prisma/enums";

export interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    role: UserRole;
    name: string;
}