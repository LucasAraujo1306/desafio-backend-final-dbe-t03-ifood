import IBaseRepository from '../repositories/IBaseRepository';
import { ICategory } from '../models/ICategory';

export class CategoryService {
	private categoryRepository: IBaseRepository<ICategory>;

	constructor(categoryRepository: IBaseRepository<ICategory>) {
		this.categoryRepository = categoryRepository;
	}

	async findAllCategory(): Promise<ICategory[]> {
		const categories = await this.categoryRepository.findAll();

		return categories;
	}
}
