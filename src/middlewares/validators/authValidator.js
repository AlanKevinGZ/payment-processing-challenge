import { check } from 'express-validator';
import validateFields from '../validateFields.js';

export const registerValidation = [
  check('name', 'El nombre es obligatorio').notEmpty(),
  check('email', 'El correo debe ser válido').isEmail(),
  check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  validateFields
];

export const loginValidation = [
  check('email', 'El correo debe ser válido').isEmail(),
  check('password', 'La contraseña es obligatoria').notEmpty(),
  validateFields
];
