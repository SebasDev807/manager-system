import { NotFoundException, ConflictException } from "../../../shared";
import { IClientRepository } from "../../domain/ports/client-repository.port.interface";
import { UpdateClientDto } from "../dtos/update-client.dto";

export class UpdateClientUseCase {
    constructor(private readonly clientRepository: IClientRepository) {}

    async execute(clientId: string, userId: string, updateClientDto: UpdateClientDto): Promise<void> {
        
        // 1. Verificamos que el cliente exista y sea del usuario (seguridad)
        const client = await this.clientRepository.getClientById(clientId);

        if (!client || client.userId !== userId) {
            throw new NotFoundException("Cliente no encontrado o no tiene permisos");
        }

        // 2. Si intenta cambiar el email, verificamos que el nuevo no esté ocupado
        if (updateClientDto.email && updateClientDto.email !== client.email) {
            const emailExists = await this.clientRepository.clientEmailExist(updateClientDto.email);
            if (emailExists) {
                throw new ConflictException("El nuevo email ya está registrado por otro cliente");
            }
        }

        await this.clientRepository.updateClient(clientId, updateClientDto);
    }
}