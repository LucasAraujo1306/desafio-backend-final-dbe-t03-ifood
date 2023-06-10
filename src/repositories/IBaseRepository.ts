export default interface IBaseRepository<T> {
	findAll(...rest: any): Promise<T[]>;
	findById(id: number): Promise<T | null>;
	create(data: T): Promise<Partial<T> | null>;
	update(data: T): Promise<T | null>;
	delete(id: number): Promise<void>;
}
