import { Router } from 'express';
import { AuthController } from '../controllers';

const router = Router();

router.post('/signup', AuthController.createUser.bind(AuthController));
router.post('/request-magic-login', AuthController.requestMagicLogin.bind(AuthController));
router.post('/verify-token', AuthController.verifyToken.bind(AuthController));

export default router;
