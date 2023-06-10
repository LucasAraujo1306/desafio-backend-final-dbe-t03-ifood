import { IOrderProduct, OrderProduct } from '../../models/IOrderProduct';
import IBaseRepository from '../IBaseRepository';

export class OrderProductSequelize implements IBaseRepository<IOrderProduct> {
	async findAll(produto_id?: number): Promise<IOrderProduct[]> {
		if (produto_id) {
			const ordersProduct = await OrderProduct.findAll({ where: { produto_id } });

			return ordersProduct;
		}

		const ordersProduct = await OrderProduct.findAll();

		return ordersProduct;
	}

	findById(id: number): Promise<IOrderProduct | null> {
		throw new Error('Method not implemented.');
	}

	create(data: IOrderProduct): Promise<Partial<IOrderProduct> | null> {
		throw new Error('Method not implemented.');
	}

	update(data: IOrderProduct): Promise<IOrderProduct | null> {
		throw new Error('Method not implemented.');
	}

	delete(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
