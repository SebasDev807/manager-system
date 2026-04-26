import { ConflictException } from "../../../shared";
import { IClientRepository } from "../../domain/ports/client-repository.port.interface";
import { CreateClientDto } from "../dtos/create-client.dto";

export class CreateClientUseCase {

    constructor(
        private readonly clientRepository: IClientRepository
    ) { }

    // Post Method 
    async execute(userId: string, createClientDto: CreateClientDto) {
        
        const emailExists = await this.clientRepository.clientEmailExist(createClientDto.email);
        
        if (emailExists) {
            throw new ConflictException(`El email ${createClientDto.email} ya está registrado`);
        }

        return this.clientRepository.createClient(userId, createClientDto);
    }
}