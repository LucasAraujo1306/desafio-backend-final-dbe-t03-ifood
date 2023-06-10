import { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import { validateFileRequest } from '../middlewares/validateFileRequest';
import { FileController } from '../controllers/FileController';
import { FileService } from '../services/FileService';

const fileController = new FileController(new FileService());

const router = Router();

router.use(isAuthenticated);
router.get('/', fileController.getAllFiles);
router.post('/upload/', validateFileRequest, fileController.uploadFile);

export default router;
