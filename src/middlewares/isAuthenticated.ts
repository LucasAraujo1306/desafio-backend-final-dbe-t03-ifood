import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UserSequelizeRepositories } from '../repositories/user/UserSequelizeRepositories';

interface Payload {
	sub: string;
}

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
	const authToken = req.headers.authorization;

	if (!authToken) {
		return res.status(401).json({ mensagem: 'Token não informado' });
	}

	const [_, token] = authToken.split(' ');

	const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
	const user_id = Number(sub);

	const userRepository = new UserSequelizeRepositories();
	const user = await userRepository.findById(user_id);

	if (!user) {
		return res.status(401).json({ mensagem: 'Token inválido' });
	}

	req.user = user;

	return next();
}
