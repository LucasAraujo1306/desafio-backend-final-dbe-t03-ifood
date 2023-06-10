import { BadRequestError, NotFoundError, Unprocessable } from '../errors';
import { ICategory } from '../models/ICategory';
import { IOrderProduct } from '../models/IOrderProduct';
import { IProduct } from '../models/IProducts';
import IBaseRepository from '../repositories/IBaseRepository';
import { capitalizeWords } from '../utils/capitalizeWords';
import { deletedCloudImage, getPath, registerCloudImage } from '../utils/storage';

export class ProductService {
	constructor(
		private readonly productRepository: IBaseRepository<IProduct>,
		private readonly categoryRepository: IBaseRepository<ICategory>,
		private readonly orderProductRepository: IBaseRepository<IOrderProduct>
	) {}

	async findAllProduct(categoryId?: number): Promise<IProduct[]> {
		const products = await this.productRepository.findAll(categoryId);

		return products;
	}

	async findProductById(productId: number): Promise<IProduct> {
		if (isNaN(productId)) {
			throw new Unprocessable('Ops! A página está indisponível');
		}
		const product = await this.productRepository.findById(productId);

		if (!product) {
			throw new NotFoundError('Produto não encontrado');
		}

		return product;
	}

	async createProduct({
		descricao,
		quantidade_estoque,
		valor,
		categoria_id,
		produto_imagem
	}: IProduct): Promise<Partial<IProduct> | null> {
		const category = await this.categoryRepository.findById(categoria_id);

		if (!category) {
			throw new NotFoundError('Categoria não encontrada');
		}

		const descricaoCapitalized = capitalizeWords(descricao);

		if (produto_imagem) {
			let product = await this.productRepository.create({
				descricao: descricaoCapitalized,
				quantidade_estoque,
				valor,
				categoria_id,
				produto_imagem
			} as IProduct);

			return product;
		}

		let product = await this.productRepository.create({
			descricao: descricaoCapitalized,
			quantidade_estoque,
			valor,
			categoria_id
		} as IProduct);

		return product;
	}

	async updateProductById(
		id: number,
		{ descricao, quantidade_estoque, valor, categoria_id, produto_imagem }: IProduct
	): Promise<IProduct | null> {
		if (isNaN(id)) {
			throw new Unprocessable('Ops! A página está indisponível');
		}

		let existsProduct = await this.findProductById(id);
		const existsCategory = await this.categoryRepository.findById(categoria_id);

		if (!existsProduct) {
			throw new NotFoundError('Produto não encontrado');
		}

		if (!existsCategory) {
			throw new NotFoundError('Categoria não encontrada');
		}

		if (existsProduct.produto_imagem) {
			await deletedCloudImage(getPath(existsProduct.produto_imagem));
		}

		const productUpdate = await this.productRepository.update({
			id,
			descricao,
			quantidade_estoque,
			valor,
			categoria_id,
			produto_imagem: produto_imagem ? produto_imagem : null
		} as IProduct);

		return productUpdate;
	}

	async deleteProductById(productId: number): Promise<void> {
		if (isNaN(productId)) {
			throw new Unprocessable('Ops! A página está indisponível');
		}

		const product = await this.productRepository.findById(productId);
		const url = product?.produto_imagem;

		if (!product) {
			throw new NotFoundError('Produto não encontrado');
		}

		const productOrder = await this.orderProductRepository.findAll(productId);

		if (productOrder.length > 0) {
			throw new BadRequestError('O produto não pode ser excluído, pois está vinculado a um pedido');
		}

		if (url) {
			await deletedCloudImage(getPath(url));
		}

		await this.productRepository.delete(productId);
	}
}
