import { CreateUserDto } from "../../application/dtos/create-user.dto";
import { User } from "./user.port.interface";

export interface IUserRepository {
    getUserByEmail(email: string): Promise<User | null>;
    createUser(createUserDto:CreateUserDto): Promise<User>;
}