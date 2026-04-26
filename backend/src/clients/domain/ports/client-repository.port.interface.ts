import { CreateClientDto } from "../../application/dtos/create-client.dto";
import { UpdateClientDto } from "../../application/dtos/update-client.dto";
import { Client, ClientResponse } from "./client.port.interface";

export interface IClientRepository {
    createClient(userId: string, createClientDto: CreateClientDto): Promise<ClientResponse>
    getClients(userId: string): Promise<ClientResponse[]>
    getClientsByTerm(term: string): Promise<ClientResponse[]>;
    updateClient(id: string, updateClientDto: UpdateClientDto): Promise<void>
    deleteClient(id: string): Promise<void>
    clientEmailExist(email: string): Promise<boolean>
    getClientById(id: string): Promise<ClientResponse | null>;
}