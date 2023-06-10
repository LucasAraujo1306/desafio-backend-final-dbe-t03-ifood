import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
	constructor(private readonly productService: ProductService) {
		this.findAllProduct = this.findAllProduct.bind(this);
		this.findProductById = this.findProductById.bind(this);
		this.createProduct = this.createProduct.bind(this);
		this.updateProductById = this.updateProductById.bind(this);
		this.deleteProductById = this.deleteProductById.bind(this);
	}

	async findAllProduct(req: Request, res: Response): Promise<Response> {
		const { categoria_id: categoryId } = req.query;

		const products = await this.productService.findAllProduct(Number(categoryId));

		return res.json(products);
	}

	async findProductById(req: Request, res: Response): Promise<Response> {
		const { id: productId } = req.params;

		const product = await this.productService.findProductById(Number(productId));

		return res.json(product);
	}

	async createProduct(req: Request, res: Response): Promise<Response> {
		const bodyProduct = req.body;

		const productCreated = await this.productService.createProduct(bodyProduct);

		return res.status(201).json(productCreated);
	}

	async updateProductById(req: Request, res: Response): Promise<Response> {
		const { id: productId } = req.params;
		const bodyProduct = req.body;

		const productUpdate = await this.productService.updateProductById(Number(productId), bodyProduct);

		return res.status(200).json(productUpdate);
	}

	async deleteProductById(req: Request, res: Response): Promise<Response> {
		const { id: productId } = req.params;

		await this.productService.deleteProductById(Number(productId));

		return res.status(204).json();
	}
}
