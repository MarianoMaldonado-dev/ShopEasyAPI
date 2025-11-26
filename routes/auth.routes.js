import express from 'express';
import { register, login,} from '../controllers/auth.controller.js';
import { updateProfile } from '../controllers/user.controller.js';
import { validate, registerRules, loginRules } from '../middlewares/validator.js';
import { protect } from '../middlewares/auth.jwt.js';


const router = express.Router();

router.post('/register', registerRules(), validate, register);
router.post('/login', loginRules(), validate, login);
router.put('/profile', protect, updateProfile);

export default router;