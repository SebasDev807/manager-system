import { hashSync } from "bcryptjs";
import { IUserRepository } from "../../domain/ports/user.repository.port";
import { CreateUserDto } from "../dtos/create-user.dto";
import { ConflictException } from "../../../shared";

export class CreateUserUseCase {

    constructor(private readonly userRepository: IUserRepository) { }

    async execute(createUserDto: CreateUserDto) {
        const { email, name } = createUserDto;

        const user = await this.userRepository.getUserByEmail(email);

        if (user) {
            throw new ConflictException("User already exists");
        }

        await this.userRepository.createUser({
            name,
            email,
            password: hashSync(createUserDto.password, 10)
        });

        const secureUser = {
            email,
            name
        };

        return secureUser;

    }
}