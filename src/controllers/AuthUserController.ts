import { Request, Response } from 'express';
import { AuthUserService } from '../services/AuthUserService';

export default class AuthUserController {
	constructor(private readonly authUserService: AuthUserService) {
		this.auth = this.auth.bind(this);
	}

	async auth(req: Request, res: Response): Promise<Response> {
		const { email, senha } = req.body;

		const auth = await this.authUserService.auth({ email, senha });

		return res.json(auth);
	}
}
