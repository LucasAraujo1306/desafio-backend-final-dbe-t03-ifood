import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import { validateClientRequest } from '../middlewares/validaterClientRequest';
import { ClientController } from '../controllers/ClientController';
import { ClientService } from '../services/ClientService';
import { ClientSequelizeRepositories } from '../repositories/clients/ClientSequelizeRepositories';

const clientController = new ClientController(new ClientService(new ClientSequelizeRepositories()));

const router = Router();

router.use(isAuthenticated);
router.get('/', clientController.findAllClient);
router.get('/:id', clientController.findClientById);
router.post('/', validateClientRequest, clientController.createClient);
router.put('/:id', validateClientRequest, clientController.updateClient);

export default router;
