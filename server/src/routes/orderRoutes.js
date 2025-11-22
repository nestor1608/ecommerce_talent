import express from 'express';
import {
    createOrder,
    processOrderPayment,
    getOrderById,
    getUserOrders,
    updateOrderStatus,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect, createOrder);
router.post('/payment', protect, processOrderPayment);
router.get('/:id', protect, getOrderById);
router.get('/user/:userId', protect, getUserOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
