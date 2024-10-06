import { Router } from 'express';
import { register, login, testConnection } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', testConnection);

export default router;
