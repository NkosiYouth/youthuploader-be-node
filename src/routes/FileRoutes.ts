import { Router } from 'express';
import { FileController as Controller } from '../controllers';
import uploadWithMulter from '../utils/multer';
import { verifyToken } from '../middlewares';

const router = Router();

router.post('/files', verifyToken, uploadWithMulter.array('files'), Controller.create.bind(Controller));

export default router;
