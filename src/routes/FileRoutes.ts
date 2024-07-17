import { Router } from 'express';
import { FileController as Controller } from '../controllers';
import uploadWithMulter from '../utils/multer';

const router = Router();

router.post('/files', uploadWithMulter.array('files'), Controller.create.bind(Controller));

export default router;
