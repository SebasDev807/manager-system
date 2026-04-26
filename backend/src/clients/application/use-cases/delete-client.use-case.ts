import { NotFoundException } from "../../../shared";
import { IClientRepository } from "../../domain/ports/client-repository.port.interface";

export class DeleteClientUseCase {
  
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(clientId: string, userId: string): Promise<void> {
        
        // 1. Validar existencia y propiedad
        const client = await this.clientRepository.getClientById(clientId);

        if (!client || client.userId !== userId) {
            throw new NotFoundException("No se encontró el cliente para eliminar");
        }

        // 2. Ejecutar borrado lógico
        await this.clientRepository.deleteClient(clientId);
    }
}