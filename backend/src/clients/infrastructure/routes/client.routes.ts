import { Router } from "express";
import { ClientRepository } from "../adapters/prisma-client.repository";
import { ClientController } from "../controllers/client.controller";
import { authenticate, validate } from "../../../shared";
// Casos de Uso
import { CreateClientUseCase } from "../../application/use-cases/create-client.use-case";
import { GetClientsByTermUseCase } from "../../application/use-cases/get-clients-by-term.use-case";
import { UpdateClientUseCase } from "../../application/use-cases/update-client.use-case";
import { DeleteClientUseCase } from "../../application/use-cases/delete-client.use-case";

// Schemas de validación
import { createClientSchema } from "../schemas/create-client.schema";
import { updateClientSchema } from "../schemas/update-client.schema";
import { GetClientsUseCase } from "../../application/use-cases/get-client.use-case";

const clientRouter = Router();

// 1. Inyección de Dependencias
const clientRepository = new ClientRepository();
const createClientUseCase = new CreateClientUseCase(clientRepository);
const getClientsUseCase = new GetClientsUseCase(clientRepository);
const getClientsByTermUseCase = new GetClientsByTermUseCase(clientRepository);
const updateClientUseCase = new UpdateClientUseCase(clientRepository);
const deleteClientUseCase = new DeleteClientUseCase(clientRepository);

const clientController = new ClientController(
    createClientUseCase,
    getClientsUseCase,
    getClientsByTermUseCase,
    updateClientUseCase,
    deleteClientUseCase
);

// Todas las rutas de clientes requieren autenticación
clientRouter.use(authenticate);

/**
 * @openapi
 * /clients:
 *   get:
 *     summary: Get all clients
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClientResponse'
 */
clientRouter.get('/', clientController.getClients);

/**
 * @openapi
 * /clients/search:
 *   get:
 *     summary: Search clients by term
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         description: Name, email or company to search
 *     responses:
 *       200:
 *         description: List of clients matching the term
 */
clientRouter.get('/search', clientController.searchClients);

/**
 * @openapi
 * /clients:
 *   post:
 *     summary: Create a new Client
 *     description: Creates a new client associated with the authenticated user ID.
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClientDto'
 *           example:
 *             name: "Acme Corp"
 *             email: "contact@acme.com"
 *             company: "Acme Industries"
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClientResponse'
 *             example:
 *               id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *               name: "Acme Corp"
 *               email: "contact@acme.com"
 *               company: "Acme Industries"
 *               createdAt: "2024-01-15T10:30:00.000Z"
 *               updatedAt: "2024-01-15T10:30:00.000Z"
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: "Validation failed"
 *               errors:
 *                 - field: "email"
 *                   message: "email must be a valid email address"
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Unauthorized"
 *       403:
 *         description: Forbidden - You do not have permission to perform this action
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 403
 *               message: "Forbidden"
 *       409:
 *         description: Conflict - A client with this email already exists
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 409
 *               message: "A client with the email 'contact@acme.com' already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: "Internal server error"
 */
clientRouter.post('/',
    validate(createClientSchema),
    clientController.createClient
);

/**
 * @openapi
 * /clients/{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateClientDto'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */
clientRouter.put('/:id',
    validate(updateClientSchema),
    clientController.updateClient
);

/**
 * @openapi
 * /clients/{id}:
 *   delete:
 *     summary: Soft delete a client
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */
clientRouter.delete('/:id', clientController.deleteClient);

export default clientRouter;