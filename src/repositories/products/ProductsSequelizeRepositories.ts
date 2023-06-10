import { Category, ICategory } from '../../models/ICategory';
import { IProduct, Product } from '../../models/IProducts';
import IBaseRepository from '../IBaseRepository';

interface IProductWithCategory extends IProduct {
	descricao: string;
	quantidade_estoque: number;
	valor: number;
	categoria: ICategory;
}

export class ProductsSequelizeRepositories implements IBaseRepository<IProduct> {
	async findAll(categoria_id?: number): Promise<IProduct[]> {
		if (!categoria_id) {
			const products = (await Product.findAll({
				include: [{ model: Category, as: 'categoria' }],
				attributes: { exclude: ['categoria_id'] }
			})) as IProductWithCategory[];

			return products;
		}

		const products = (await Product.findAll({
			where: {
				categoria_id
			},
			include: [{ model: Category, as: 'categoria' }],
			attributes: { exclude: ['categoria_id'] }
		})) as IProductWithCategory[];

		return products;
	}

	async findById(productId: number): Promise<IProduct | null> {
		const product = (await Product.findByPk(productId, {
			include: [{ model: Category, as: 'categoria' }],
			attributes: { exclude: ['categoria_id'] }
		})) as IProductWithCategory;

		return product;
	}

	async create({
		descricao,
		quantidade_estoque,
		valor,
		categoria_id,
		produto_imagem
	}: IProduct): Promise<IProduct | null> {
		const product = (await Product.create(
			{
				descricao,
				quantidade_estoque,
				valor,
				categoria_id,
				produto_imagem
			},
			{
				returning: true
			}
		)) as IProduct;

		return product;
	}

	async update({
		id,
		descricao,
		quantidade_estoque,
		valor,
		categoria_id,
		produto_imagem
	}: IProduct): Promise<IProduct | null> {
		const product = (await Product.update(
			{ descricao, quantidade_estoque, valor, categoria_id, produto_imagem },
			{
				where: { id },
				returning: true
			}
		).then(([_, [updatedProduct]]) => updatedProduct)) as IProduct;

		return product;
	}

	async delete(productId: number): Promise<void> {
		await Product.destroy({ where: { id: productId } });
	}
}
