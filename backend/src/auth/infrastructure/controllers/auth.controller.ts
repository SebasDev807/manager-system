import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { LoginUseCase } from "../../application/use-cases/login.use-case";

export class AuthController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUseCase: LoginUseCase
    ) { }

    createUser = async (req: Request, res: Response) => {
        const { name, password, email } = req.body;
        const user = await this.createUserUseCase.execute({ name, password, email });
        return res.status(201).json({ user });
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const data = await this.loginUseCase.execute({ email, password });
        return res.status(200).json({ data });
    }

}