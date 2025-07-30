import jwt from 'jsonwebtoken';

export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
