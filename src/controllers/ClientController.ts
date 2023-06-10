import { Request, Response } from 'express';
import { ClientService } from '../services/ClientService';
import { IClient } from '../models/IClient';

export class ClientController {
	constructor(private readonly clientService: ClientService) {
		this.createClient = this.createClient.bind(this);
		this.findClientById = this.findClientById.bind(this);
		this.updateClient = this.updateClient.bind(this);
		this.findAllClient = this.findAllClient.bind(this);
	}

	async findAllClient(req: Request, res: Response): Promise<Response> {
		const clients = await this.clientService.findAllClient();

		return res.json(clients);
	}

	async findClientById(req: Request, res: Response): Promise<Response> {
		const { id: clientId } = req.params;

		const client = await this.clientService.findClientById(Number(clientId));

		return res.json(client);
	}

	async createClient(req: Request, res: Response): Promise<Response> {
		const bodyClient = req.body as IClient;

		const client = await this.clientService.createClient(bodyClient);

		return res.status(201).json(client);
	}

	async updateClient(req: Request, res: Response): Promise<Response> {
		const { id: clientId } = req.params;
		const { nome, email, cpf, cep, numero }: IClient = req.body;

		const clientUpdate = await this.clientService.updateClient({
			id: Number(clientId),
			nome,
			email,
			cpf,
			cep,
			numero
		} as IClient);

		return res.json(clientUpdate);
	}
}
