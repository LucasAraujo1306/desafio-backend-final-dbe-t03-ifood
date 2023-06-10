import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UnauthorizedError } from '../errors';
import { IUser } from '../models/IUser';
import { IUserRepository } from '../repositories/user/IUserRepository';

export interface IAuthUser {
	email: string;
	senha: string;
}

export class AuthUserService {
	constructor(private readonly authUserRepository: IUserRepository<IUser>) {}

	async auth({ email, senha }: IAuthUser) {
		const user = await this.authUserRepository.findByEmail(email);

		if (!user) {
			throw new UnauthorizedError('Email e senha não conferem');
		}

		const passwordMatch = await compare(senha, user.senha);

		if (!passwordMatch) {
			throw new UnauthorizedError('Email e senha não conferem');
		}

		const token = sign(
			{
				name: user.nome,
				email: user.email
			},
			process.env.JWT_SECRET as string,
			{
				subject: String(user.id),
				expiresIn: '8h'
			}
		);

		const { senha: _, ...userWithoutPassword } = user;

		return { user: userWithoutPassword, token };
	}
}
