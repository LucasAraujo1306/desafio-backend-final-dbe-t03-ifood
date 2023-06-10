import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import { validateProductRequest } from '../middlewares/validateProductRequest';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../services/ProductService';
import { ProductsSequelizeRepositories } from '../repositories/products/ProductsSequelizeRepositories';
import { CategorySequelizeRepositories } from '../repositories/category/CategorySequelizeRepositories';
import { OrderProductSequelize } from '../repositories/order-product/OrderProductSequelize';

const productController = new ProductController(
	new ProductService(new ProductsSequelizeRepositories(), new CategorySequelizeRepositories(), new OrderProductSequelize())
);

const router = Router();

router.use(isAuthenticated);
router.get('/', productController.findAllProduct);
router.get('/:id', productController.findProductById);
router.post('/', validateProductRequest, productController.createProduct);
router.put('/:id', validateProductRequest, productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

export default router;
