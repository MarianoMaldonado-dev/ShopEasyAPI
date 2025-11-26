import express from 'express';
import { getUsers, deleteUser, updateProfile } from '../controllers/user.controller.js';
import { protect, admin } from '../middlewares/auth.jwt.js';

const router = express.Router();

// Rutas de administración de usuarios
router.get('/', protect, admin, getUsers);
router.delete('/:id', protect, admin, deleteUser);

export default router;