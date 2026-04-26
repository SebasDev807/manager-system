import { Request, Response } from "express";
import { CreateClientUseCase } from "../../application/use-cases/create-client.use-case";
import { DeleteClientUseCase } from "../../application/use-cases/delete-client.use-case";
import { GetClientsUseCase } from "../../application/use-cases/get-client.use-case";
import { GetClientsByTermUseCase } from "../../application/use-cases/get-clients-by-term.use-case";
import { UpdateClientUseCase } from "../../application/use-cases/update-client.use-case";


export class ClientController {

    constructor(
        private readonly createClientUseCase: CreateClientUseCase,
        private readonly getClientsUseCase: GetClientsUseCase,
        private readonly getClientsByTermUseCase: GetClientsByTermUseCase,
        private readonly updateClientUseCase: UpdateClientUseCase,
        private readonly deleteClientUseCase: DeleteClientUseCase,
    ) { }

    createClient = async (req: Request, res: Response) => {
        try {
            const client = await this.createClientUseCase.execute(req.user!.id, req.body);
            return res.status(201).json(client);
        } catch (error: any) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }

    getClients = async (req: Request, res: Response) => {
        try {
            const clients = await this.getClientsUseCase.execute(req.user!.id);
            return res.status(200).json(clients);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    searchClients = async (req: Request, res: Response) => {
        try {
            const term = req.query.term as string;
            const clients = await this.getClientsByTermUseCase.execute(term || "");
            return res.status(200).json(clients);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    updateClient = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            await this.updateClientUseCase.execute(id, req.user!.id, req.body);
            return res.status(204).json({ message: "Cliente actualizado con éxito" });
        } catch (error: any) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }

    deleteClient = async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            await this.deleteClientUseCase.execute(id, req.user!.id);
            return res.status(204).json({ message: "Cliente eliminado con éxito" });
        } catch (error: any) {
            return res.status(error.status || 400).json({ message: error.message });
        }
    }
}