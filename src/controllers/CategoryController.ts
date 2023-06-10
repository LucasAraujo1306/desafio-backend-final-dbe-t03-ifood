import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {
		this.findAllCategory = this.findAllCategory.bind(this);
	}

	async findAllCategory(req: Request, res: Response): Promise<Response> {
		const categories = await this.categoryService.findAllCategory();

		return res.json(categories);
	}
}
