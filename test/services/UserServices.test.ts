import { describe, expect, it, beforeAll } from '@jest/globals';
import { UserServices } from '../../src/services/UserServices';
import { IUser, User } from '../../src/models/IUser';
import { UserSequelizeRepositories } from '../../src/repositories/user/UserSequelizeRepositories';
import { ConflictError, NotFoundError } from '../../src/errors';
import { fail } from 'assert';

const userServices = new UserServices(new UserSequelizeRepositories());

describe('test UserServices', () => {
	const nome = 'felipe';
	const email = 'fucas@gmail.com';
	const senha = '123456';

	const id1 = 1;
	const nome2 = 'lucas';
	const email2 = 'lucas@gmail.com';
	const senha2 = '123456';

	const nome3 = 'nome trocado';

	const nome4 = 'gilson';
	const email4 = 'gilson@gmail.com';

	beforeAll(async () => {
		await User.sync({ force: true });
	});

	it('should create a new user', async () => {
		const newUser = await userServices.createUser({
			nome,
			email,
			senha
		} as IUser);
		expect(newUser).not.toBeInstanceOf(Error);
		expect(newUser).toHaveProperty('id');
		expect(newUser).toHaveProperty('email');
		expect(newUser).toHaveProperty('nome');
		expect(newUser?.senha).not.toBe(senha);
	});

	it('should create a new user2', async () => {
		await userServices.createUser({
			nome: nome4,
			email: email4,
			senha: senha2
		} as IUser);
	});

	it('should not create a new user with the same email', async () => {
		try {
			await userServices.createUser({
				nome,
				email,
				senha
			} as IUser);
			fail('expected ConflictError to be thrown');
		} catch (error) {
			expect(error).toBeInstanceOf(ConflictError);
		}
	});

	it('should must not allow registration without the email', async () => {
		try {
			await userServices.createUser({
				nome,
				senha
			} as IUser);
			fail('expected ConflictError to be thrown');
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});

	it('should must not allow registration without the senha', async () => {
		try {
			await userServices.createUser({
				nome,
				email
			} as IUser);
			fail('expected ConflictError to be thrown');
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});

	it('should must not allow registration without the nome', async () => {
		try {
			await userServices.createUser({
				email,
				senha
			} as IUser);
			fail('expected ConflictError to be thrown');
		} catch (error) {
			expect(error).toBeInstanceOf(Error);
		}
	});

	it('should find a user by id', async () => {
		const user = await User.findOne({ where: { email } });
		const userFound = await userServices.getUserById(user?.id!);
		expect(userFound).not.toBeInstanceOf(Error);
		expect(userFound).toHaveProperty('id');
		expect(userFound).toHaveProperty('email');
		expect(userFound).toHaveProperty('nome');
		expect(userFound?.senha).not.toBe(senha);
		expect(userFound).not.toHaveProperty('');
	});

	it('should not find a user by id', async () => {
		try {
			await userServices.getUserById(999);
			fail('expected ConflictError to be thrown');
		} catch (error) {
			expect(error).toBeInstanceOf(NotFoundError);
		}
	});

	it('should update user', async () => {
		const userUpdate = await userServices.updateUser({
			id: id1,
			nome: nome2,
			email: email2,
			senha: senha2
		} as IUser);
		expect(userUpdate).toHaveProperty('id');
		expect(userUpdate).toHaveProperty('email');
		expect(userUpdate).toHaveProperty('nome');
		expect(userUpdate).not.toHaveProperty('');
		expect(userUpdate).not.toBeInstanceOf(Error);
	});

	it('should update user with same email', async () => {
		const userUpdate = await userServices.updateUser({
			id: id1,
			nome: nome3,
			email: email2,
			senha: senha2
		} as IUser);
		expect(userUpdate).toHaveProperty('id');
		expect(userUpdate).toHaveProperty('email');
		expect(userUpdate).toHaveProperty('nome');
		expect(userUpdate).not.toHaveProperty('');
		expect(userUpdate).not.toBeInstanceOf(Error);
	});

	it("should not update the user with	other user's email", async () => {
		try {
			await userServices.updateUser({
				id: id1,
				nome: nome3,
				email: email4,
				senha: senha2
			} as IUser);
			fail('expected ConflictError to be thrown');
		} catch (error) {
			expect(error).toBeInstanceOf(ConflictError);
		}
	});
});
