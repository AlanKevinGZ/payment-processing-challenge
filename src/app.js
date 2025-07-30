import express from 'express';
import setupMiddleware from './middlewares/index.js';
import sequelize, { syncDatabase } from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import paymentRoutes from './routes/payment.routes.js';

const app = express();

setupMiddleware(app);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos');
    await syncDatabase();
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
}

export default app;
