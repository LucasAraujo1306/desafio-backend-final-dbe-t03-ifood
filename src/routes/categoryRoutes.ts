import { Router } from 'express';
import { CategoryController } from '../controllers/CategoryController';
import { CategoryService } from '../services/CategoryService';
import { CategorySequelizeRepositories } from '../repositories/category/CategorySequelizeRepositories';

const categoryController = new CategoryController(new CategoryService(new CategorySequelizeRepositories()));

const router = Router();

router.get('/', categoryController.findAllCategory);

export default router;
