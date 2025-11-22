import express from 'express';
import {
    register,
    login,
    forgotPassword,
    resetPassword,
    getMe,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import {
    registerValidation,
    loginValidation,
    validateRequest
} from '../middleware/validation.js';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/me', protect, getMe);

export default router;
