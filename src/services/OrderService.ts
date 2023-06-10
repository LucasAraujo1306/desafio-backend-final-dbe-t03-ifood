import { SendEmailServices } from './SendEmailService';
import { BadRequestError, NotFoundError } from '../errors';
import { IProduct } from '../models/IProducts';
import { IOderCreateOrUpdate } from '../repositories/order/OderSequelizeRepositories';
import { compilerHTML } from '../utils/compilerHtml';
import IBaseRepository from '../repositories/IBaseRepository';
import { IClient } from '../models/IClient';

export class OrderService {
	constructor(
		private readonly orderRepository: IBaseRepository<IOderCreateOrUpdate>,
		private readonly produtoRepository: IBaseRepository<IProduct>,
		private readonly clienteRepository: IBaseRepository<IClient>,
		private readonly emailService: SendEmailServices
	) {}

	async findAll(idClient?: number) {
		const orders = await this.orderRepository.findAll(idClient);

		return orders;
	}

	async createOrder({ cliente_id, observacao, pedido_produtos }: IOderCreateOrUpdate) {
		const client = await this.clienteRepository.findById(cliente_id);

		if (!client) {
			throw new NotFoundError(`O cliente não encontrado`);
		}

		let notFoundProductIds = [];
		let foundProducts = [];
		let total_value = 0;

		for (const [index, pedido_produto] of pedido_produtos.entries()) {
			const foundProduct = await this.produtoRepository.findById(pedido_produto.produto_id);

			if (!foundProduct) {
				notFoundProductIds.push(pedido_produto.produto_id);
			} else if (foundProduct.quantidade_estoque < pedido_produtos[index].quantidade_produto) {
				throw new BadRequestError(
					`O Produto '${foundProduct.descricao}' não possui a quantidade em estoque suficiente para atender a quantidade solicitada`
				);
			}

			foundProducts.push(foundProduct);
		}

		if (notFoundProductIds.length > 0) {
			throw new NotFoundError(
				`Os seguintes produtos não foram encontrados: ${notFoundProductIds.map((id) => `ID: ${id}`).join(', ')}`
			);
		}

		if (pedido_produtos.length === foundProducts.length) {
			for (const [index, product] of pedido_produtos.entries()) {
				const product = foundProducts[index];
				if (!product) {
					throw new NotFoundError(`O Produto não foi encontrado`);
				} else {
					await this.produtoRepository.update({
						id: product.id,
						descricao: product.descricao,
						valor: product.valor,
						quantidade_estoque: product.quantidade_estoque - pedido_produtos[index].quantidade_produto
					} as IProduct);

					pedido_produtos[index].valor_produto = product.valor;
					total_value += product.valor * pedido_produtos[index].quantidade_produto;
				}
			}

			const order = await this.orderRepository.create({
				cliente_id,
				observacao,
				pedido_produtos,
				valor_total: total_value
			} as IOderCreateOrUpdate);

			const descricao = foundProducts.map((item) => ({
				descricao: item ? item.dataValues.descricao : 'Descrição não disponível'
			}));

			const combinedArray = pedido_produtos.map((pedido, index) => {
				return {
					...pedido,
					...descricao[index]
				};
			});
			const value = (total_value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

			const html = await compilerHTML('./src/templates/index.html', {
				name: client.nome,
				order: order?.id,
				rua: client.rua,
				numero: client.numero,
				cep: client.cep,
				bairro: client.bairro,
				cidade: client.cidade,
				estado: client.estado,
				valor_total: order?.valor_total,
				observacao: order?.observacao,
				array: combinedArray,
				total_value: value
			});

			if (order) {
				const message = {
					from: `${process.env.EMAIL_NAME}<${process.env.EMAIL_FROM}>`,
					to: `${client.nome}<${client.email}>`,
					subject: `Pedido ${order.id} realizado com sucesso!`,
					html
				};

				await this.emailService.sendEmail(message);
			}

			return order;
		}
	}
}
