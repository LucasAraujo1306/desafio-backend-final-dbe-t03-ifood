import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../errors';

const errorMiddleware = (err: Error & Partial<ApiError>, req: Request, res: Response, _: NextFunction) => {
	const statusCode = err.statusCode ?? 500;
	const message = err.statusCode ? err.message : `${err.message}`;

	if (err.name === 'TokenExpiredError') {
		return res.status(401).json({ message: 'Token expirado' });
	}

	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({ message: 'Token com Assinatura inválida' });
	}

	return res.status(statusCode).json({ message });
};

export default errorMiddleware;
