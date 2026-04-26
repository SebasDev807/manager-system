import z from "zod";
import { createClientSchema } from "../../infrastructure/schemas/create-client.schema";

export type CreateClientDto = z.infer<typeof createClientSchema>;