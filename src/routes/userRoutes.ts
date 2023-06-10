import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import { validateUserRequest } from '../middlewares/validateUserRequest';
import { UserController } from '../controllers/UserController';
import { UserServices } from '../services/UserServices';
import { UserSequelizeRepositories } from '../repositories/user/UserSequelizeRepositories';

const userController = new UserController(new UserServices(new UserSequelizeRepositories()));

const router = Router();

router.post('/', validateUserRequest, userController.createUser);
router.use(isAuthenticated);
router.get('/', userController.findUserById);
router.put('/', validateUserRequest, userController.updateUser);

export default router;
