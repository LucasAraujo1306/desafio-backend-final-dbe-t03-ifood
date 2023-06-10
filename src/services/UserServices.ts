import { hash } from 'bcrypt';
import { ConflictError, NotFoundError } from '../errors';
import { IUser } from '../models/IUser';
import { IUserRepository } from '../repositories/user/IUserRepository';
import { capitalizeWords } from '../utils/capitalizeWords';

export class UserServices {
	constructor(private readonly userRepository: IUserRepository<IUser>) {}

	async getUserById(id: number): Promise<IUser | null> {
		const hasUser = await this.userRepository.findById(id);
		if (!hasUser) {
			throw new NotFoundError('Usuario não encontrado');
		}
		return hasUser;
	}

	async createUser({ nome, email, senha }: IUser): Promise<Partial<IUser> | null> {
		const existEmail = await this.userRepository.existsEmail(email);

		if (existEmail) {
			throw new ConflictError('O email informado já está em uso');
		}

		const encryptedPassword = await hash(String(senha), 10);

		const nomeCapitalized = capitalizeWords(nome);

		const user = await this.userRepository.create({
			nome: nomeCapitalized,
			email,
			senha: encryptedPassword
		} as IUser);
		return user;
	}

	async updateUser({ id, nome, email, senha }: IUser): Promise<IUser | null> {
		const userExists = await this.userRepository.findById(id!);

		if (userExists) {
			const emailExists = await this.userRepository.existsEmail(email, id);

			if (emailExists) {
				throw new ConflictError('O email informado já está em uso');
			}

			const encryptedPassword = await hash(String(senha), 10);

			const nameCapitalized = capitalizeWords(nome);

			const user = await this.userRepository.update({
				id,
				nome: nameCapitalized,
				email,
				senha: encryptedPassword
			} as IUser);

			return user;
		}
		return null;
	}
}
