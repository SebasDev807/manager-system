import { Router } from "express";

import { AuthController } from "../controllers/auth.controller";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { PrismaUserRepository } from "../adapters/prisma-user.repository";
import { CreateUserUseCase } from "../../application/use-cases/create-user.use-case";
import { registerSchema } from "../schemas/register.schema";
import { validate } from "../../../shared";
import { loginSchema } from "../schemas/login.schema";


const authRouter = Router();

const userRepository = new PrismaUserRepository();
const loginUserUseCase = new LoginUseCase(userRepository)
const createUserUseCase = new CreateUserUseCase(userRepository);
const authController = new AuthController(createUserUseCase, loginUserUseCase);


/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided information
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: $Ecret123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict - User already exists
 *       500:
 *         description: Internal server error
 */
authRouter.post("/register", validate(registerSchema), authController.createUser);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Login with user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: jhondoe@gmail.com
 *     responses:
 *       200:
 *         description: Login Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       500:
 *         description: Internal server error
 */
authRouter.post("/login", validate(loginSchema), authController.login);


export default authRouter;