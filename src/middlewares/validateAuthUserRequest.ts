import { Request, Response, NextFunction } from 'express';
import { authUserSchema } from '../schemas/authUserSchema';
import { IUser } from '../models/IUser';
import { getErrorMessage } from '../errors/handleErros';

export const validateAuthUserRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body;
		await authUserSchema.validate(user);
		next();
	} catch (error) {
		res.status(422).json({ mensagem: getErrorMessage(error) });
	}
};
