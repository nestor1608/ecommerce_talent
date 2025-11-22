import express from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getRelatedProducts,
    addProductReview,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { productValidation, validateRequest } from '../middleware/validation.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);
router.post('/', protect, admin, productValidation, validateRequest, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/:id/reviews', protect, addProductReview);

export default router;
