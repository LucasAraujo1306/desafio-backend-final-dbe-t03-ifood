import { NextFunction, Request, Response } from 'express';
import { getErrorMessage } from '../errors';
import { IOrder } from '../models/IOrder';
import { oderSchema } from '../schemas/orderSchema';

export const validateOrderRequest = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const order: IOrder = req.body;
		await oderSchema.validate(order);
		next();
	} catch (error) {
		res.status(422).json({ mensagem: getErrorMessage(error) });
	}
};
