import { check } from 'express-validator';
import validateFields from '../validateFields.js';

export const updateUserValidation = [
  check('email')
    .optional()
    .isEmail().withMessage('Debe proporcionar un correo válido'),
  check('name')
    .optional()
    .notEmpty().withMessage('El nombre no debe estar vacío'),
  validateFields
];

export const updatePasswordValidation = [
  check('newPassword', 'La nueva contraseña es obligatoria y debe tener al menos 6 caracteres')
    .isLength({ min: 6 }),
  validateFields
];
