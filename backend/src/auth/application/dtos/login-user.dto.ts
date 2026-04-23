import z from "zod";

export const loginUserSchema = z.object({
    email: z.email("Invalid email address").toLowerCase().trim(),
    password: z.string("Password is required"),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;