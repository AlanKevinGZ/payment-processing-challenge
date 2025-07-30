import User from '../models/user.model.js';
import { Op } from 'sequelize';
import { hashPassword } from '../helper/hash.js';
import { sendResponse } from '../helper/sendResponse.js';
import { handleErrorResponse } from '../helper/handleError.js';
import { excludePassword } from '../helper/excludePassword.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });

    sendResponse(res, {
      message: 'Usuarios obtenidos correctamente',
      data: { users }
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return sendResponse(res, {
        status: 404,
        message: 'Usuario no encontrado'
      });
    }

    sendResponse(res, {
      message: 'Usuario encontrado',
      data: { user }
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, isActive } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return sendResponse(res, {
        status: 404,
        message: 'Usuario no encontrado'
      });
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: id }
        }
      });
      if (exists) {
        return sendResponse(res, {
          status: 400,
          message: 'El email ya está en uso'
        });
      }
    }

    await user.update({
      email: email ?? user.email,
      name: name ?? user.name,
      isActive: isActive ?? user.isActive
    });

    sendResponse(res, {
      message: 'Usuario actualizado correctamente',
      data: { user: excludePassword(user) }
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return sendResponse(res, {
        status: 400,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return sendResponse(res, {
        status: 404,
        message: 'Usuario no encontrado'
      });
    }

    const hashed = await hashPassword(newPassword);
    await user.update({ password: hashed });

    sendResponse(res, {
      message: 'Contraseña actualizada correctamente',
      data: { userId: user.id }
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return sendResponse(res, {
        status: 404,
        message: 'Usuario no encontrado'
      });
    }

    await user.update({
      isActive: false,
      email: `deleted_${Date.now()}_${user.email}`
    });

    sendResponse(res, {
      message: 'Usuario eliminado correctamente',
      data: { userId: user.id }
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
