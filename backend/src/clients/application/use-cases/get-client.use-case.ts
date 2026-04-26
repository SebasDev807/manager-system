import { UnauthorizedException } from "../../../shared";
import { IClientRepository } from "../../domain/ports/client-repository.port.interface";
import { ClientResponse } from "../../domain/ports/client.port.interface";

export class GetClientsUseCase {
    
    constructor(private readonly clientRepository: IClientRepository) { }

    async execute(userId: string): Promise<ClientResponse[]> {
       
        if (!userId) {
            throw new UnauthorizedException("Usuario no identificado");
        }
        return await this.clientRepository.getClients(userId);
    }
}