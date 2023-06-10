import { describe, expect, it, beforeAll } from '@jest/globals';
import { UnauthorizedError } from '../../src/errors';
import { IUser, User } from '../../src/models/IUser';
import { AuthUserService } from '../../src/services/AuthUserService';
import { UserSequelizeRepositories } from '../../src/repositories/user/UserSequelizeRepositories';
import { fail } from 'assert';

import { UserServices } from '../../src/services/UserServices';

const autUserService = new AuthUserService(new UserSequelizeRepositories());
const userServices = new UserServices(new UserSequelizeRepositories());

interface IAuthUser {
	email: string;
	senha: string;
}
describe('test AutUserService', () => {
	const nome = 'Test';
	const email = 'test@test.com';
	const senha = '123456';

	const email1 = 'test@test.com';
	const senha1 = '123';

	const email2 = 't@test.com';
	const senha2 = '123456';

	beforeAll(async () => {
		await User.sync({ force: true });
	});
	describe('create a new user becouse test AutUserService ', () => {
		it('should create a new user', async () => {
			const newUser = await userServices.createUser({
				nome,
				email,
				senha
			} as IUser);
			expect(newUser).toHaveProperty('id');
			expect(newUser).toHaveProperty('email');
			expect(newUser).toHaveProperty('nome');
			expect(newUser?.senha).not.toBe(senha);
		});
	});
	describe('create a new user becouse test AutUserService ', () => {
		it('should return client', async () => {
			const client = await autUserService.auth({ email, senha } as IAuthUser);
			expect(client).toHaveProperty('token');
			expect(client).toHaveProperty('user');
			expect(client?.user).toHaveProperty('id', 1);
			expect(client?.user).toHaveProperty('email', email);
			expect(client?.user).toHaveProperty('nome', nome);
		});

		it('should return error becouse senha1 is wrong', async () => {
			try {
				await autUserService.auth({
					email: email1,
					senha: senha1
				} as IAuthUser);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedError);
			}
		});

		it('should return error becouse email2 is wrong', async () => {
			try {
				await autUserService.auth({
					email: email2,
					senha: senha2
				} as IAuthUser);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(UnauthorizedError);
			}
		});
	});
});
