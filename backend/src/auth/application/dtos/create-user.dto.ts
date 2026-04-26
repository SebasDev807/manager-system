import z from "zod";
import {registerSchema} from '../../infrastructure/schemas/register.schema'

export type CreateUserDto = z.infer<typeof registerSchema>;