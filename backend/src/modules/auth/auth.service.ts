import { ConflictException } from "../../exceptions";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";

export class AuthService {

    async loginUser(loginUserDto: LoginUserDto) {
        throw new ConflictException("Testing conflict exception");
    }

    async createUser(createUserDto: CreateUserDto) {
        return "This action will create a new user";
    }

}