import { Request, Response, NextFunction } from 'express';
import { fileSchema } from '../schemas/fileSchema';
import { getErrorMessage } from '../errors/handleErros';

export const validateFileRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		await fileSchema.validate(req.body.imagem);
		next();
	} catch (error) {
		return res.status(422).json({ mensagem: getErrorMessage(error) });
	}
};
