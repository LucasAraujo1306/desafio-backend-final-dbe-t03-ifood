import { ICategory, Category } from '../../models/ICategory';
import IBaseRepository from '../IBaseRepository';

export class CategorySequelizeRepositories implements IBaseRepository<ICategory> {
	async findAll(...rest: any): Promise<ICategory[]> {
		const categories = await Category.findAll();

		return categories;
	}

	async findById(idCategory: number): Promise<ICategory | null> {
		const category = await Category.findByPk(idCategory);

		return category;
	}

	create(data: ICategory): Promise<ICategory | null> {
		throw new Error('Method not implemented.');
	}

	update(data: ICategory, ...rest: any): Promise<ICategory | null> {
		throw new Error('Method not implemented.');
	}

	delete(...rest: any): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
