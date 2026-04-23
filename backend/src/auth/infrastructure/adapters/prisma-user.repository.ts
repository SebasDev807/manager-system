import { prisma } from "../../../shared/lib/prisma";
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

    async createUser(name: string, email: string, password: string): Promise<User> {

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