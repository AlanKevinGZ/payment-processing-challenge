import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helper/hash.js";
import { generateToken } from "../helper/token.js";
import { handleErrorResponse } from "../helper/handleError.js";
import { excludePassword } from "../helper/excludePassword.js";
import { sendResponse } from "../helper/sendResponse.js";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return sendResponse(res, {
        status: 400,
        message: "Usuario ya existente",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword });

    sendResponse(res, {
      status: 201,
      message: "Usuario registrado",
      data: { user: excludePassword(user) },
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, {
        status: 404,
        message: "Usuario no encontrado"
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return sendResponse(res, {
        status: 401,
        message: "Contraseña incorrecta"
      });
    }

    const token = generateToken({ id: user.id, email: user.email });

    return sendResponse(res, {
      data: {
        token,
        user: excludePassword(user)
      }
    });
   
  } catch (error) {
    handleErrorResponse(res, error);
  }
};