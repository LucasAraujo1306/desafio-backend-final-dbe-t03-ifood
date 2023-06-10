import { ApiError } from './ApiError';

export class Unprocessable extends ApiError {
	constructor(message: string) {
		super(message, 422);
	}
}
