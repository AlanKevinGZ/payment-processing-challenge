import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { registerValidation, loginValidation } from '../middlewares/validators/authValidator.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
