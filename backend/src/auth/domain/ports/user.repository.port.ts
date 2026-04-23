import { User } from "./user.port.interface";

export interface IUserRepository {
    getUserByEmail(email: string): Promise<User | null>;
    createUser(name: string, email: string, password: string): Promise<User>;
}