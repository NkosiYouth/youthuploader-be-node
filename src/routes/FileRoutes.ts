import { Router } from 'express';
import { FileController as Controller } from '../controllers';
import uploadWithMulter from '../utils/multer';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/upload-multiple', verifyToken, uploadWithMulter.array('files'), Controller.upload.bind(Controller));

router.get('/', verifyToken, Controller.index.bind(Controller));

router.delete('/:id', verifyToken, Controller.deleteById.bind(Controller));

export default router;
