import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import { validateOrderRequest } from '../middlewares/validateOrderRequest';
import { OrderController } from '../controllers/OrderController';
import { OrderService } from '../services/OrderService';
import { SendEmailServices } from '../services/SendEmailService';
import { OrderSequelizeRepositories } from '../repositories/order/OderSequelizeRepositories';
import { ProductsSequelizeRepositories } from '../repositories/products/ProductsSequelizeRepositories';
import { ClientSequelizeRepositories } from '../repositories/clients/ClientSequelizeRepositories';

const orderController = new OrderController(
	new OrderService(
		new OrderSequelizeRepositories(),
		new ProductsSequelizeRepositories(),
		new ClientSequelizeRepositories(),
		new SendEmailServices()
	)
);
const router = Router();

router.use(isAuthenticated);
router.post('/', isAuthenticated, validateOrderRequest, orderController.createOrder);
router.get('/', isAuthenticated, orderController.findAll);

export default router;
