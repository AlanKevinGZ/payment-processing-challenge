import express from 'express';
import {createTransaction,getUserTransactions,getTransactionById,updateTransaction, deleteTransaction} from '../controllers/payment.controller.js';

import { authenticateToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(authenticateToken);

router.post('/transactions', createTransaction);
router.get('/transactions', getUserTransactions);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);


export default router;
