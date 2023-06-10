import { NotFoundError, Unprocessable, ConflictError } from '../errors';
import { IClient } from '../models/IClient';
import { IClientRepository } from '../repositories/clients/IClientRepository';
import { ClientSequelizeRepositories } from '../repositories/clients/ClientSequelizeRepositories';
import { capitalizeWords } from '../utils/capitalizeWords';
import { searchZipCode } from '../utils/consultZipCode';

export class ClientService {
	private clientRepository: ClientSequelizeRepositories;

	constructor(clientRepository: IClientRepository<IClient>) {
		this.clientRepository = clientRepository;
	}

	async findAllClient(): Promise<IClient[]> {
		const clients = await this.clientRepository.findAll();

		return clients;
	}

	async findClientById(idClient?: number): Promise<IClient> {
		if (isNaN(idClient ?? NaN)) {
			throw new Unprocessable('Ops! A página está indisponível');
		}

		const client = await this.clientRepository.findById(idClient);

		if (!client) {
			throw new NotFoundError('Cliente não encontrado');
		}

		return client;
	}

	async createClient({ nome, email, cpf, cep, numero }: IClient): Promise<Partial<IClient> | null> {
		const existEmail = await this.clientRepository.existsEmail(email);

		if (existEmail) {
			throw new ConflictError('O email informado já está em uso');
		}

		const cpfFactor = cpf.replace(/[^\d]/g, '');
		const existsClientCPF = await this.clientRepository.existsClientCPF(cpfFactor);

		if (existsClientCPF) {
			throw new ConflictError('O cpf informado esta indisponível');
		}

		const nomeCapitalized = capitalizeWords(nome);

		let { cepReplace, info } = await infoCep(cep);

		const client = await this.clientRepository.create({
			nome: nomeCapitalized,
			email,
			cpf: cpfFactor,
			cep: cepReplace,
			rua: info?.rua,
			numero: numero == '' || !numero ? null : numero,
			bairro: info?.bairro,
			cidade: info?.cidade,
			estado: info?.estado
		} as IClient);

		return client;
	}

	async updateClient({ id, nome, email, cpf, cep, numero }: IClient): Promise<IClient | null> {
		if (isNaN(id ?? NaN)) {
			throw new Unprocessable('Ops! A página está indisponível');
		}

		if (id) {
			const existsClient = await this.findClientById(id);

			if (!existsClient) {
				throw new NotFoundError('Cliente não encontrado');
			}
		}

		const existEmail = await this.clientRepository.existsEmail(email, id);

		if (existEmail) {
			throw new ConflictError('O email informado já está em uso');
		}

		const nomeCapitalized = capitalizeWords(nome);

		const cpfReplace = cpf.replace(/[^\d]/g, '');
		const existsClientCPF = await this.clientRepository.existsClientCPF(cpfReplace, id);

		if (existsClientCPF) {
			throw new ConflictError('O cpf informado esta indisponível');
		}

		let { cepReplace, info } = await infoCep(cep);

		const client = await this.clientRepository.update({
			id,
			nome: nomeCapitalized,
			email,
			cpf: cpfReplace,
			cep: cepReplace,
			rua: info?.rua,
			numero: numero == '' || !numero ? null : numero,
			bairro: info?.bairro,
			cidade: info?.cidade,
			estado: info?.estado
		} as IClient);

		return client;
	}
}

const infoCep = async (cep?: string) => {
	let info;
	let cepReplace;
	if (cep) {
		cepReplace = cep?.replace('-', '');
		info = await searchZipCode(cepReplace);
		cepReplace = info.cep.replace('-', '');
	}

	return { cepReplace, info };
};
