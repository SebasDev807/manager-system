import { AuthService } from "./auth.service";
import { Request, Response } from "express";

export class AuthController {

    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    createUser = async (req: Request, res: Response) => {
        const { name, password, email } = req.body;
        const message = await this.authService.createUser({ name, password, email });
        return res.status(201).json({ message });
    }

    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const message = await this.authService.loginUser({ email, password });
        return res.status(200).json({ message });
    }

}