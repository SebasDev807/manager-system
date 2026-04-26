import { IClientRepository } from "../../domain/ports/client-repository.port.interface";
import { ClientResponse } from "../../domain/ports/client.port.interface";

export class GetClientsByTermUseCase {
    
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(term: string): Promise<ClientResponse[]> {
        const cleanTerm = term.trim();

        // Evitamos búsquedas con menos de 2 caracteres para mejorar performance
        if (cleanTerm.length < 2) {
            return []; 
        }

        return await this.clientRepository.getClientsByTerm(cleanTerm);
    }
}