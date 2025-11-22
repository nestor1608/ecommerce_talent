import express from 'express';
import {
    submitContact,
    getContactMessages,
    updateContactStatus,
} from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { contactValidation, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.post('/', contactValidation, validateRequest, submitContact);
router.get('/messages', protect, admin, getContactMessages);
router.put('/:id/status', protect, admin, updateContactStatus);

export default router;
