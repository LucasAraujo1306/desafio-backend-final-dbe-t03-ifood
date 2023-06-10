import { Router } from 'express';
import AuthUserController from '../controllers/AuthUserController';
import { validateAuthUserRequest } from '../middlewares/validateAuthUserRequest';
import { AuthUserService } from '../services/AuthUserService';
import { UserSequelizeRepositories } from '../repositories/user/UserSequelizeRepositories';

const authUserController = new AuthUserController(new AuthUserService(new UserSequelizeRepositories()));

const router = Router();

router.post('/', validateAuthUserRequest, authUserController.auth);

export default router;
