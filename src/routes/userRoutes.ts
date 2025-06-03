import { Router } from 'express';
import {
  register,
  login,
  getCurrentUser,
  updateUsername,
  updatePassword,
  logout,
} from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/me', authMiddleware, getCurrentUser);
router.post('/username', authMiddleware, updateUsername);
router.post('/password', authMiddleware, updatePassword);
router.post('/logout', authMiddleware, logout);

export default router;