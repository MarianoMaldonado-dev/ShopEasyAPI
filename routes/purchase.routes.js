import express from 'express';
import {
    createPurchase,
    getPurchases,
    getPurchaseById,
} from '../controllers/purchase.controller.js';
import { protect } from '../middlewares/auth.jwt.js';
import { validate, purchaseRules } from '../middlewares/validator.js';

const router = express.Router();

// Todas las rutas de compras están protegidas
router.use(protect);

router.route('/')
    .post(purchaseRules(), validate, createPurchase)
    .get(getPurchases);

router.route('/:id').get(getPurchaseById);

// PUT y DELETE para compras no se implementan según el requerimiento,
// ya que modificar o eliminar una compra suele ser una operación más compleja (ej. devoluciones).
// Si se necesitan, se pueden añadir aquí.

export default router;