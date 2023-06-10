export interface IUserRequest {
	id: number;
	nome: string;
	email: string;
}

declare global {
	namespace Express {
		interface Request {
			user: IUsers;
		}
	}
}
