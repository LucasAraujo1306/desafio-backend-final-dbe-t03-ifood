import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { IOderCreateOrUpdate } from '../repositories/order/OderSequelizeRepositories';

export class OrderController {
	constructor(private readonly orderService: OrderService) {
		this.createOrder = this.createOrder.bind(this);
		this.findAll = this.findAll.bind(this);
	}

	async findAll(req: Request, res: Response): Promise<Response> {
		const { cliente_id: clientId } = req.query;

		const orders = await this.orderService.findAll(Number(clientId));

		return res.json(orders);
	}

	async createOrder(req: Request, res: Response): Promise<Response> {
		const { cliente_id, observacao, pedido_produtos }: IOderCreateOrUpdate = req.body;

		const orderCreated = await this.orderService.createOrder({
			cliente_id,
			observacao,
			pedido_produtos
		});

		return res.status(201).json(orderCreated);
	}
}
