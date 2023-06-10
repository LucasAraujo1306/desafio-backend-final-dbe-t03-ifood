import { Op } from 'sequelize';
import { IClient, Client } from '../../models/IClient';
import { IClientRepository } from './IClientRepository';

export class ClientSequelizeRepositories implements IClientRepository<IClient> {
	async findAll(): Promise<IClient[]> {
		const clients = await Client.findAll();

		return clients;
	}

	async findById(id?: number): Promise<IClient | null> {
		const client = await Client.findByPk(id);

		return client;
	}

	async create({
		nome,
		email,
		cpf,
		cep,
		rua,
		numero,
		bairro,
		cidade,
		estado
	}: IClient): Promise<Partial<IClient> | null> {
		const clientCreate = await Client.create({
			nome,
			email,
			cpf,
			cep,
			rua,
			numero,
			bairro,
			cidade,
			estado
		});

		return clientCreate;
	}

	async update({ id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado }: IClient): Promise<IClient | null> {
		const client = await Client.findByPk(id);

		if (client) {
			client.nome = nome;
			client.email = email;
			client.cpf = cpf;
			client.cep = cep;
			client.rua = rua;
			client.numero = numero;
			client.bairro = bairro;
			client.cidade = cidade;
			client.estado = estado;
			const clientUpdate = (await client.save().then((client) => {
				return {
					id: client.id,
					nome: client.nome,
					email: client.email,
					cpf: client.cpf,
					cep: client.cep,
					rua: client.rua,
					numero: client.numero,
					bairro: client.bairro,
					cidade: client.cidade,
					estado: client.estado
				};
			})) as IClient;

			return clientUpdate;
		}

		return null;
	}

	async delete(...rest: any): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async existsEmail(email: string, id?: number): Promise<boolean> {
		if (!id) {
			const client = await Client.findOne({ where: { email } });

			return !!client;
		}
		const client = await Client.findOne({
			where: {
				email,
				id: {
					[Op.not]: id
				}
			}
		});

		return !!client;
	}

	async existsClientCPF(cpf: string, id?: number | undefined): Promise<boolean> {
		if (!id) {
			const existCPF = await Client.findOne({
				where: {
					cpf
				}
			});

			return !!existCPF;
		}
		const existCPF = await Client.findOne({
			where: {
				cpf,
				id: {
					[Op.not]: id
				}
			}
		});

		return !!existCPF;
	}
}
