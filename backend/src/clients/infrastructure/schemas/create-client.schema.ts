import z from "zod";

export const createClientSchema = z.object({
    
    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),

    email: z.email("Invalid email address")
        .toLowerCase(),

    company: z.string()
        .min(4, "Company must be at least 4 characters long")
        .max(50,"Company must be at most 50 characters long")
});

