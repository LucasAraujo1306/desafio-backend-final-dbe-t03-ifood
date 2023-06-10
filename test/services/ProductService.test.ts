import { describe, expect, it, beforeAll, jest } from '@jest/globals';
import { Unprocessable, NotFoundError } from '../../src/errors';
import { IProduct, Product } from '../../src/models/IProducts';
import { ProductService } from '../../src/services/ProductService';
import { CategorySequelizeRepositories } from '../../src/repositories/category/CategorySequelizeRepositories';
import { ProductsSequelizeRepositories } from '../../src/repositories/products/ProductsSequelizeRepositories';
import { OrderProductSequelize } from '../../src/repositories/order-product/OrderProductSequelize';
import { fail } from 'assert';

const productService = new ProductService(
	new ProductsSequelizeRepositories(),
	new CategorySequelizeRepositories(),
	new OrderProductSequelize()
);

describe('test ProductService', () => {
	const product: IProduct = {
		descricao: 'Produto de Teste',
		quantidade_estoque: 10,
		valor: 999,
		categoria_id: 999
	} as IProduct;
	const product1: IProduct = {
		descricao: 'Produto De Test',
		quantidade_estoque: 10,
		valor: 9999,
		categoria_id: 1
	} as IProduct;
	const product2: IProduct = {
		descricao: 'Produto De Teste2',
		quantidade_estoque: 5,
		valor: 899,
		categoria_id: 999
	} as IProduct;
	const product3: IProduct = {
		descricao: 'Produto De Teste3',
		quantidade_estoque: 5,
		valor: 599,
		categoria_id: 5
	} as IProduct;

	beforeAll(async () => {
		await Product.sync({ force: true });
	});
	describe('test ProductService.createProduct', () => {
		it('should throw NotFoundError an erro if categoria_id not exist', async () => {
			try {
				await productService.createProduct(product);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		it('should create product', async () => {
			const result = await productService.createProduct(product1);
			expect(result?.id).toBeDefined();
			expect(result?.descricao).toBe(product1.descricao);
			expect(result?.quantidade_estoque).toBe(product1.quantidade_estoque);
			expect(result?.valor).toBe(product1.valor);
			expect(result?.categoria_id).toBe(product1.categoria_id);
			expect(result).toHaveProperty('descricao');
			expect(result).toHaveProperty('quantidade_estoque');
			expect(result).toHaveProperty('valor');
			expect(result).toHaveProperty('categoria_id');
		});
	});

	describe('test ProductService.findProductById', () => {
		it('should fail detail product by id', async () => {
			try {
				await productService.findProductById(Number('1invalid-id'));
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(Unprocessable);
			}
		});

		it('should not find a product by id', async () => {
			try {
				await productService.findProductById(999);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		it('should detail product by id', async () => {
			const res = await productService.findProductById(1);
			expect(res).toHaveProperty('id');
			expect(res).toHaveProperty('descricao');
			expect(res).toHaveProperty('quantidade_estoque');
			expect(res).toHaveProperty('valor');
			expect(res).toHaveProperty('categoria');
		});
	});

	describe('test ProductService.findAllProduct', () => {
		it('should list products', async () => {
			const listAll = await productService.findAllProduct();
			expect(listAll.length).toBeGreaterThanOrEqual(1);
			for (let i = 0; i < listAll.length; i++) {
				expect(listAll[i]).toHaveProperty('id');
				expect(listAll[i]).toHaveProperty('descricao');
				expect(listAll[i]).toHaveProperty('quantidade_estoque');
				expect(listAll[i]).toHaveProperty('valor');
				expect(listAll[i]).toHaveProperty('categoria');
			}
		});
	});

	describe('test ProductService.updateProductById', () => {
		it('should fail update product by id because id is not number', async () => {
			try {
				await productService.updateProductById(Number('1invalid-id'), product);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(Unprocessable);
			}
		});

		it('should fail product update because id does not exist', async () => {
			try {
				await productService.updateProductById(999, product);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		it('should fail product update because category_id does not exist', async () => {
			try {
				await productService.updateProductById(1, product2);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		it('should update product by id successfully', async () => {
			const result = await productService.updateProductById(1, product3);
			expect(result).toHaveProperty('id');
			expect(result).toHaveProperty('descricao');
			expect(result).toHaveProperty('quantidade_estoque');
			expect(result).toHaveProperty('valor');
			expect(result).toHaveProperty('categoria_id');
			// expect(result?.id).toBe(1);
			// expect(result?.descricao).toBe(product3?.descricao);
			// expect(result?.quantidade_estoque).toBe(product3?.quantidade_estoque);
			// expect(result?.valor).toBe(product3?.valor);
			// expect(result?.categoria_id).toBe(product3?.categoria_id);
		});
	});

	describe('test ProductService.deleteProductById', () => {
		it('should fail delete product by id because id is not number', async () => {
			try {
				await productService.deleteProductById(Number('1invalid-id'));
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(Unprocessable);
			}
		});

		it('should fail delete product by id because id does not exist', async () => {
			try {
				await productService.deleteProductById(999);
				fail('expected ConflictError to be thrown');
			} catch (error) {
				expect(error).toBeInstanceOf(NotFoundError);
			}
		});

		// it('should delete product by id successfully', async () => {
		// 	const result = await productService.deleteProductById(1);
		// 	expect(result).toBeUndefined();
		// });
	});
});
