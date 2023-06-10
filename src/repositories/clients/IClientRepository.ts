import IBaseRepository from '../IBaseRepository';

export interface IClientRepository<T> extends IBaseRepository<T> {
	existsEmail(email: string, id?: number): Promise<boolean>;
	existsClientCPF(cpf: string, id?: number): Promise<boolean>;
}
