import { Transaction, User } from '../models/index.js';
import { sendResponse } from '../helper/sendResponse.js';
import { formatTransactionResponse } from '../helper/formatTransactionResponse.js';

export const createTransaction = async (req, res) => {
  try {
    const { amount, currency, cardLast4, cardType } = req.body;

    const transaction = await Transaction.create({
      userId: req.userId,
      amount,
      currency,
      cardLast4,
      cardType,
    });

    const transactionWithUser = await Transaction.findByPk(transaction.id, {
      include: {
        model: User,
        as: 'user',
        attributes: ['name'],
      },
    });

    const formatted = formatTransactionResponse(transactionWithUser.toJSON());

    return sendResponse(res, {
      status: 201,
      message: 'Transacción creada',
      data: formatted
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      message: 'Error al crear transacción',
      data: { error: error.message }
    });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { userId: req.userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['name']
      }],
      order: [['createdAt', 'DESC']]
    });

    const formatted = transactions.map(t => formatTransactionResponse(t.toJSON()));

    return sendResponse(res, {
      message: 'Transacciones obtenidas correctamente',
      data: formatted
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      message: 'Error al obtener transacciones',
      data: { error: error.message }
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: { id, userId: req.userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['name']
      }]
    });

    if (!transaction) {
      return sendResponse(res, {
        status: 404,
        message: 'Transacción no encontrada'
      });
    }

    const formatted = formatTransactionResponse(transaction.toJSON());

    return sendResponse(res, {
      message: 'Transacción encontrada',
      data: formatted
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      message: 'Error al buscar transacción',
      data: { error: error.message }
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, currency, status, cardType } = req.body;

    const transaction = await Transaction.findOne({
      where: { id, userId: req.userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['name']
      }]
    });

    if (!transaction) {
      return sendResponse(res, {
        status: 404,
        message: 'Transacción no encontrada'
      });
    }

    transaction.amount = amount ?? transaction.amount;
    transaction.currency = currency ?? transaction.currency;
    transaction.status = status ?? transaction.status;
    transaction.cardType = cardType ?? transaction.cardType;

    await transaction.save();

    const formatted = formatTransactionResponse(transaction.toJSON());

    return sendResponse(res, {
      message: 'Transacción actualizada',
      data: formatted
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      message: 'Error al actualizar transacción',
      data: { error: error.message }
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      where: { id, userId: req.userId },
    });

    if (!transaction) {
      return sendResponse(res, {
        status: 404,
        message: 'Transacción no encontrada'
      });
    }

    await transaction.destroy();

    return sendResponse(res, {
      message: 'Transacción eliminada',
      data: { id }
    });
  } catch (error) {
    return sendResponse(res, {
      status: 500,
      message: 'Error al eliminar transacción',
      data: { error: error.message }
    });
  }
};
