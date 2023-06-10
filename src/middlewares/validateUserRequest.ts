import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../schemas/userSchema';
import { IUser } from '../models/IUser';
import { getErrorMessage } from '../errors/handleErros';

export const validateUserRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: IUser = req.body;
		await userSchema.validate(user);
		next();
	} catch (error) {
		res.status(422).json({ mensagem: getErrorMessage(error) });
	}
};
