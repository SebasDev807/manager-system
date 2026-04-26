import { prisma } from "../../../shared/lib/prisma";
import { CreateUserDto } from "../../application/dtos/create-user.dto";
import { User } from "../../domain/ports/user.port.interface";
import { IUserRepository } from '../../domain/ports/user.repository.port';

export class PrismaUserRepository implements IUserRepository {

    async getUserByEmail(email: string): Promise<User | null> {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {

        const { email, name, password } = createUserDto;
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        });

        return user;
    }

}