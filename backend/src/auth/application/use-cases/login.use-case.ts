import { compareSync } from "bcryptjs";
import { NotFoundException, UnauthorizedException } from "../../../shared";
import { IUserRepository } from "../../domain/ports/user.repository.port";
import { LoginUserDto } from "../dtos/login-user.dto";
import { generateJWT } from "../../../shared/utils/generate-jwt";

export class LoginUseCase {

    constructor(private readonly userRepository: IUserRepository) { }

    async execute(loginUserDto: LoginUserDto) {
        
        const { email, password } = loginUserDto;

        const user = await this.userRepository.getUserByEmail(email);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (!compareSync(password, user.password)) {
            throw new UnauthorizedException("Invalid credentials");
        }


        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: generateJWT({ id: user.id, email: user.email })
        }

    }

}
