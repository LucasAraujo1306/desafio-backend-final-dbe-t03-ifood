import { Order } from '../../models/IOrder';
import { OrderProduct } from '../../models/IOrderProduct';
import IBaseRepository from '../IBaseRepository';

interface IArrayProducts {
	id?: number;
	pedido_id?: number;
	produto_id: number;
	quantidade_produto: number;
	valor_produto?: number;
}
export interface IOderCreateOrUpdate {
	id?: number;
	cliente_id: number;
	observacao?: string;
	pedido_produtos: IArrayProducts[];
	valor_total?: number;
}

export class OrderSequelizeRepositories implements IBaseRepository<IOderCreateOrUpdate> {
	async findAll(clientId?: number): Promise<IOderCreateOrUpdate[]> {
		if (clientId) {
			const order = (await Order.findAll({
				where: { cliente_id: clientId },
				include: OrderProduct
			})) as unknown as IOderCreateOrUpdate[];

			const productOrdersList = order.map((p) => ({
				pedido: {
					id: p.id,
					valor_total: p.valor_total,
					observacao: p.observacao,
					cliente_id: p.cliente_id
				},
				pedido_produtos: p.pedido_produtos.map((pp) => ({
					id: pp.id,
					quantidade_produto: pp.quantidade_produto,
					valor_produto: pp.valor_produto,
					pedido_id: pp.pedido_id,
					produto_id: pp.produto_id
				}))
			}));

			return productOrdersList as unknown as IOderCreateOrUpdate[];
		}

		const order = (await Order.findAll({
			include: OrderProduct
		})) as unknown as IOderCreateOrUpdate[];

		const productOrdersList = order.map((p) => ({
			pedido: {
				id: p.id,
				valor_total: p.valor_total,
				observacao: p.observacao,
				cliente_id: p.cliente_id
			},
			pedido_produtos: p.pedido_produtos.map((pp) => ({
				id: pp.id,
				quantidade_produto: pp.quantidade_produto,
				valor_produto: pp.valor_produto,
				pedido_id: pp.pedido_id,
				produto_id: pp.produto_id
			}))
		}));

		return productOrdersList as unknown as IOderCreateOrUpdate[];
	}

	findById(id: number): Promise<IOderCreateOrUpdate | null> {
		throw new Error('Method not implemented.');
	}

	async create({
		cliente_id,
		observacao,
		pedido_produtos,
		valor_total
	}: IOderCreateOrUpdate): Promise<Partial<IOderCreateOrUpdate> | null> {
		const order = await Order.create({
			cliente_id,
			observacao,
			valor_total
		}).then((order) => {
			pedido_produtos.forEach(async (p) => {
				OrderProduct.create({
					pedido_id: order.id,
					produto_id: p.produto_id,
					quantidade_produto: p.quantidade_produto,
					valor_produto: p.valor_produto
				});
			});
			const newOrder = { id: order.id, cliente_id, observacao, valor_total };

			return newOrder;
		});

		return order;
	}

	update(data: IOderCreateOrUpdate): Promise<IOderCreateOrUpdate | null> {
		throw new Error('Method not implemented.');
	}
	delete(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
