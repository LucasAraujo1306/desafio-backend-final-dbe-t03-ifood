import { Op } from 'sequelize';
import { IUser, User } from '../../models/IUser';
import { IUserRepository } from './IUserRepository';

export class UserSequelizeRepositories implements IUserRepository<IUser> {
	async findAll(...rest: any): Promise<IUser[]> {
		throw new Error('Method not implemented.');
	}

	async findById(id: number): Promise<IUser | null> {
		const user = (await User.findOne({
			where: { id },
			attributes: { exclude: ['senha'] }
		})) as IUser;

		return user;
	}

	async create({ nome, email, senha }: IUser): Promise<Partial<IUser> | null> {
		const userCreate = (await User.create({ nome, email, senha }).then((user) => {
			return { id: user.id, nome: user.nome, email: user.email };
		})) as IUser;

		return userCreate;
	}

	async update({ id, nome, email, senha }: IUser): Promise<IUser | null> {
		const user = await User.findByPk(id);

		if (user) {
			user.nome = nome;
			user.email = email;
			user.senha = senha;
			const userUpdate = (await user.save().then((user) => {
				return { id: user.id, nome: user.nome, email: user.email };
			})) as IUser;

			return userUpdate;
		}
		return null;
	}

	delete(...rest: any): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async existsEmail(email: string, id?: number): Promise<boolean> {
		if (!id) {
			const user = await User.findOne({ where: { email } });

			return !!user;
		}
		const user = await User.findOne({
			where: {
				email,
				id: {
					[Op.not]: id
				}
			}
		});

		return !!user;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = (await User.findOne({ where: { email } })) as IUser;

		return user?.toJSON();
	}
}
