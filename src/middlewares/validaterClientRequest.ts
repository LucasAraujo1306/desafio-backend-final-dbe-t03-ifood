import { Request, Response, NextFunction } from 'express';
import { clientSchema } from '../schemas/clientSchema';
import { IClient } from '../models/IClient';
import { getErrorMessage } from '../errors';

export const validateClientRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const client: IClient = req.body;
		await clientSchema.validate(client);
		next();
	} catch (error) {
		res.status(422).json({ mensagem: getErrorMessage(error) });
	}
};
