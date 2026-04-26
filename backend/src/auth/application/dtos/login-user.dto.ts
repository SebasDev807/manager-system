import z from "zod";
import { loginUserSchema } from "../../infrastructure/schemas/login.schema";

export type LoginUserDto = z.infer<typeof loginUserSchema>;