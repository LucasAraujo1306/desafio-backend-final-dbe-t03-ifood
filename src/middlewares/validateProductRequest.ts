import { Request, Response, NextFunction } from 'express';
import { productSchema } from '../schemas/productSchema';
import { IProduct } from '../models/IProducts';
import { getErrorMessage } from '../errors/handleErros';

export const validateProductRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product: IProduct = req.body;
		await productSchema.validate(product);
		next();
	} catch (error) {
		res.status(422).json({ mensagem: getErrorMessage(error) });
	}
};
