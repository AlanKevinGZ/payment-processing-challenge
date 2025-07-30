import { check } from 'express-validator';
import validateFields from '../validateFields.js';

export const createTransactionValidation = [
  check('amount', 'El monto es obligatorio y debe ser un número positivo')
    .isFloat({ gt: 0 }),
  check('currency', 'La moneda es obligatoria y debe ser un string de 3 letras')
    .isLength({ min: 3, max: 3 }),
  check('cardLast4', 'Los últimos 4 dígitos de la tarjeta deben ser exactamente 4 números')
    .isLength({ min: 4, max: 4 })
    .isNumeric(),
  check('cardType', 'El tipo de tarjeta es obligatorio')
    .notEmpty(),
  validateFields
];

export const updateTransactionValidation = [
  check('amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('El monto debe ser un número positivo'),
  check('currency')
    .optional()
    .isLength({ min: 3, max: 3 }).withMessage('La moneda debe tener 3 letras'),
  check('status')
    .optional()
    .isIn(['pending', 'approved', 'rejected', 'cancelled'])
    .withMessage('El estado debe ser uno de: pending, approved, rejected, cancelled'),
  check('cardType')
    .optional()
    .notEmpty().withMessage('El tipo de tarjeta no puede estar vacío'),
  validateFields
];

