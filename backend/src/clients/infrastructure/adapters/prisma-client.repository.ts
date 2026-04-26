import { ClientModel } from "../../../generated/prisma/models";
import { Logger } from "../../../shared";
import { prisma } from "../../../shared/lib/prisma";
import { CreateClientDto } from "../../application/dtos/create-client.dto";
import { UpdateClientDto } from "../../application/dtos/update-client.dto";
import { IClientRepository } from "../../domain/ports/client-repository.port.interface";
import { Client, ClientResponse } from "../../domain/ports/client.port.interface";

export class ClientRepository implements IClientRepository {

    private toClientResponse(client: ClientModel): ClientResponse {
        return {
            id: client.id,
            name: client.name,
            email: client.email ?? "",
            company: client.company ?? "",
            status: client.status,
            userId: client.userId
        };
    }

    async createClient(userId: string, createClientDto: CreateClientDto): Promise<ClientResponse> {
        try {

            const client = await prisma.client.create({
                data: { ...createClientDto, userId }
            });

            return this.toClientResponse(client);

        } catch (error) {
            Logger.error(`Error al crear cliente:, ${error}`);
            throw new Error("No se pudo crear el cliente");
        }
    }

    async getClients(userId: string): Promise<ClientResponse[]> {
        try {
            const clients = await prisma.client.findMany({
                where: { userId }
            });

            return clients.map(client => this.toClientResponse(client));
        } catch (error) {
            Logger.error(`Error al obtener clientes para el usuario ${userId}: ${error}`);
            throw new Error("No se pudieron obtener los clientes");
        }
    }

    async getClientsByTerm(term: string): Promise<ClientResponse[]> {
        try {
            const clients = await prisma.client.findMany({
                where: {
                    OR: [
                        { name: { contains: term, mode: 'insensitive' } },
                        { email: { contains: term, mode: 'insensitive' } },
                        { company: { contains: term, mode: 'insensitive' } },
                    ],
                },
            });
            return clients.map(client => this.toClientResponse(client));
        } catch (error) {
            Logger.error(`Error buscando clientes: ${error}`);
            throw new Error("No se pudo realizar la búsqueda");
        }
    }

    async updateClient(id: string, updateClientDto: UpdateClientDto): Promise<void> {
        try {
            await prisma.client.update({
                where: { id },
                data: updateClientDto
            });
        } catch (error) {
            Logger.error(`Error al actualizar cliente: ${error}`);
            throw new Error("No se pudo actualizar el cliente");
        }
    }

    async deleteClient(id: string): Promise<void> {
        try {
            await prisma.client.update({
                where: { id },
                data: {
                    deletedAt: new Date(),
                    status: 'inactive'
                }
            });
        } catch (error) {
            Logger.error(`Error al aplicar soft delete al cliente ${id}: ${error}`);
            throw new Error("No se pudo eliminar el cliente");
        }
    }

    async clientEmailExist(email: string): Promise<boolean> {
        try {
            const client = await prisma.client.findFirst({
                where: {
                    email,
                    deletedAt: null // Solo buscamos entre clientes activos
                }
            });

            // Convertimos el resultado a booleano: si existe objeto es true, si es null es false
            return !!client;

        } catch (error) {
            Logger.error(`Error al verificar email ${email}: ${error}`);
            throw new Error("No se pudo verificar la existencia del cliente");
        }
    }

    async getClientById(id: string): Promise<ClientResponse | null> {
        try {
            const client = await prisma.client.findFirst({
                where: {
                    id,
                    deletedAt: null // Importante: No devolver clientes eliminados
                }
            });

            // Si no existe, devolvemos null directamente
            if (!client) return null;

            // Usamos el mapper para transformar el modelo de base de datos a ClientResponse
            return this.toClientResponse(client);

        } catch (error) {
            Logger.error(`Error al obtener cliente por ID ${id}: ${error}`);
            throw new Error("Error interno al buscar el cliente");
        }
    }

}