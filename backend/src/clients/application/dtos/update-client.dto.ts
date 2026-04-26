import z from "zod";
import { updateClientSchema } from "../../infrastructure/schemas/update-client.schema";

export type UpdateClientDto = z.infer<typeof updateClientSchema>;