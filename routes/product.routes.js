import express from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/product.controller.js';
import { protect, admin } from '../middlewares/auth.jwt.js';
import { validate, productRules } from '../middlewares/validator.js';

const router = express.Router();

// Rutas públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rutas protegidas
router.post('/', protect, productRules(), validate, createProduct);
router.put('/:id', protect, productRules(), validate, updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;