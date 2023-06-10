import { Request, Response } from 'express';
import { UserServices } from '../services/UserServices';
import { IUser } from '../models/IUser';

export class UserController {
	constructor(private readonly userServices: UserServices) {
		this.createUser = this.createUser.bind(this);
		this.findUserById = this.findUserById.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	async findUserById(req: Request, res: Response): Promise<Response> {
		const { id: userId } = req.user as IUser;

		const user = await this.userServices.getUserById(Number(userId));

		return res.json(user);
	}

	async createUser(req: Request, res: Response): Promise<Response> {
		const bodyUser = req.body as IUser;

		const userCreated = await this.userServices.createUser(bodyUser);

		return res.status(201).json(userCreated);
	}

	async updateUser(req: Request, res: Response): Promise<Response> {
		const { id: userId } = req.user as IUser;
		const { nome, email, senha } = req.body;

		const userUpdated = await this.userServices.updateUser({
			id: userId,
			nome,
			email,
			senha
		} as IUser);

		return res.json(userUpdated);
	}
}
