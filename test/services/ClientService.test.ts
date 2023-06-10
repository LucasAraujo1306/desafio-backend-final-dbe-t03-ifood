import { describe, expect, it, beforeAll } from '@jest/globals';
import { ConflictError, Unprocessable, NotFoundError } from '../../src/errors';
import { IClient, Client } from '../../src/models/IClient';
import { ClientService } from '../../src/services/ClientService';
import { ClientSequelizeRepositories } from '../../src/repositories/clients/ClientSequelizeRepositories';
import { fail } from 'assert';

const clientService = new ClientService(new ClientSequelizeRepositories());

describe('test ClientService', () => {
	const client: IClient = {
		nome: 'João da Silva',
		email: 'laisclaracortereal@eximiart.com.br',
		cpf: '187.944.628-60',
		cep: '70000-000',
		numero: '123'
	} as IClient;
	const client1: IClient = {
		nome: 'Laís Clara Isabelly Corte Real',
		email: 'laisclaracortereal@eximiart.com.br',
		cpf: '692.365.930-20',
		cep: '79021-210',
		numero: '850'
	} as IClient;
	const client2: IClient = {
		nome: 'Miguel Diogo Igor Pires',
		email: 'miguel_pires@signa.net.br',
		cpf: '692.365.930-20',
		cep: '94818-430',
		numero: '123'
	} as IClient;
	const client3: IClient = {
		nome: 'Mirella Isabella Luzia Alves',
		email: 'mirellaisabellaalves@artedaserra.com.br',
		cpf: '401.659.951-22',
		cep: '68901-420',
		numero: ''
	} as IClient;
	const client4: IClient = {
		nome: 'Bárbara Raimunda Caroline de Paula',
		email: 'barbara_raimunda_depaula@bitco.cc',
		cpf: '310.354.422-72',
		cep: '65041-884',
		numero: '177'
	} as IClient;
	const client5: IClient = {
		nome: 'Manoel Carlos Figueiredo',
		email: 'manoelcarlosfigueiredo@smbcontabil.com.br',
		cpf: '415.599.832-72',
		cep: '17057-659',
		numero: ''
	} as IClient;
	const client6: IClient = {
		nome: 'Mirella Isabella Luzia Alves',
		email: 'mirellaisabellaalves@artedaserra.com.br',
		cpf: '401.659.951-22',
		cep: '68920-970',
		numero: '486'
	} as IClient;
	const client7: IClient = {
		nome: 'Benjamin Gustavo da Rocha',
		email: 'benjamin.gustavo.darocha@teravida.com.br',
		cpf: '635.756.669-11',
		cep: '59062-260',
		numero: '869'
	} as IClient;
	const numbHouse = '4';

	beforeAll(async () => {
		await Client.sync({ force: true });
	});

	describe('test clientService.createClient', () => {
		it('should create client', async () => {
			const clientCreate = await clientService.createClient(client1);
			expect(clientCreate).toHaveProperty('id');
			expect(clientCreate).toHaveProperty('nome', client1.nome);
			expect(clientCreate).toHaveProperty('email', client1.email);
			expect(clientCreate).toHaveProperty('cpf', client1.cpf.replace(/[^\d]/g, ''));
			expect(clientCreate).toHaveProperty('cep', client1.cep?.replace('-', ''));
			expect(clientCreate).toHaveProperty('rua');
			expect(clientCreate).toHaveProperty('numero', client1.numero);
			expect(clientCreate).toHaveProperty('bairro');
			expect(clientCreate).toHaveProperty('cidade');
			expect(clientCreate).toHaveProperty('estado');
		});

		it('should generate an error if the email has already been registered', async () => {
			try {
				await clientService.createClient(client);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(ConflictError);
			}
		});

		it('should generate an error if the cpf has already been registered', async () => {
			try {
				await clientService.createClient(client2);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(ConflictError);
			}
		});

		it('should generate a customer registration without the number of house in the database', async () => {
			const customerWithoutHouseNumber = await clientService.createClient(client3);
			expect(customerWithoutHouseNumber).toHaveProperty('numero', null);
		});
	});

	describe('test clientService.updateClient', () => {
		it('should generate an error if id is not a number when updating client', async () => {
			try {
				const clientToUpdate = await clientService.createClient(client4);
				const updatedClient = Object.assign({}, clientToUpdate, {
					id: Number('1as'),
					nome: clientToUpdate?.nome,
					email: clientToUpdate?.email,
					cpf: clientToUpdate?.cpf,
					cep: clientToUpdate?.cep,
					numero: clientToUpdate?.numero
				});
				await clientService.updateClient(updatedClient as IClient);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(Unprocessable);
			}
		});

		it('should throw an error if id does not find a customer id to update customer information', async () => {
			try {
				const clientToUpdate = await clientService.createClient(client5);
				const updatedClient = Object.assign({}, clientToUpdate, {
					id: 999,
					nome: clientToUpdate?.nome,
					email: clientToUpdate?.email,
					cpf: clientToUpdate?.cpf,
					cep: clientToUpdate?.cep,
					numero: clientToUpdate?.numero
				});
				await clientService.updateClient(updatedClient as IClient);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		it('should throw an error if cpf does not belong to customer with customer id being updated and not available', async () => {
			try {
				const clientToUpdate = await clientService.createClient(client7);
				const updatedClient = Object.assign({}, clientToUpdate, {
					id: clientToUpdate?.id,
					nome: clientToUpdate?.nome,
					email: clientToUpdate?.email,
					cpf: client3.cpf,
					cep: clientToUpdate?.cep,
					numero: clientToUpdate?.numero
				});
				await clientService.updateClient(updatedClient as IClient);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(ConflictError);
			}
		});
	});

	describe('test clientService.findClientById', () => {
		it('should be possible to update customer information', async () => {
			const clientToUpdate = await clientService.findClientById(Number(numbHouse));
			const updatedClient: IClient = Object.assign({}, clientToUpdate, {
				id: Number(numbHouse),
				nome: clientToUpdate?.nome,
				email: clientToUpdate?.email,
				cpf: clientToUpdate?.cpf,
				cep: clientToUpdate?.cep,
				rua: clientToUpdate?.rua,
				numero: numbHouse,
				bairro: clientToUpdate?.bairro,
				cidade: clientToUpdate?.cidade,
				estado: clientToUpdate?.estado
			});
			const clientUpdate = await clientService.updateClient(updatedClient);
			expect(updatedClient).toHaveProperty('id', Number(numbHouse));
			expect(updatedClient).toHaveProperty('nome', client5.nome);
			expect(updatedClient).toHaveProperty('email', client5.email);
			expect(updatedClient).toHaveProperty('cpf', client5.cpf.replace(/[^\d]/g, ''));
			expect(updatedClient).toHaveProperty('cep', client5.cep ? client5.cep.replace('-', '') : undefined);
			expect(updatedClient).toHaveProperty('rua', clientUpdate?.rua);
			expect(updatedClient).toHaveProperty('numero', `${numbHouse}`);
			expect(updatedClient).toHaveProperty('bairro', clientUpdate?.bairro);
			expect(updatedClient).toHaveProperty('cidade', clientUpdate?.cidade);
			expect(updatedClient).toHaveProperty('estado', clientUpdate?.estado);
		});

		it('should throw an error if id is not a number', async () => {
			try {
				await clientService.findClientById(Number('1client'));
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(Unprocessable);
			}
		});

		it('should throw an error if the id is a number and the client is not found', async () => {
			try {
				await clientService.findClientById(999);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		it('should return the client to look for the valid numeric id', async () => {
			const search = await clientService.findClientById(1);
			expect(search.id).toEqual(expect.any(Number));
			expect(search.id).toEqual(1);
			expect(Number.isInteger(search.id)).toBe(true);
			expect(typeof search.nome).toBe('string');
		});
	});

	describe('test clientService.findAllClient', () => {
		it('should list clients', async () => {
			const listClients = await clientService.findAllClient();
			expect(listClients).toBeInstanceOf(Array);
			expect(listClients).toHaveLength(5);
			expect(listClients[0]).toHaveProperty('nome', client1.nome);
			expect(listClients[0]).toHaveProperty('email', client1.email);
			expect(listClients[0]).toHaveProperty('cpf', client1.cpf.replace(/[^\d]/g, ''));
			expect(listClients[0]).toHaveProperty('cep', client1.cep?.replace('-', ''));
			expect(listClients[0]).toHaveProperty('rua', listClients[0].rua);
			expect(listClients[0]).toHaveProperty('numero', client1.numero);
			expect(listClients[0]).toHaveProperty('bairro', listClients[0].bairro);
			expect(listClients[0]).toHaveProperty('cidade', listClients[0].cidade);
			expect(listClients[0]).toHaveProperty('estado', listClients[0].estado);
		});
	});
});
