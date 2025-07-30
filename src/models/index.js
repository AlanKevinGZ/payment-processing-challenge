import sequelize from '../config/db.js';
import User from './user.model.js';
import Transaction from './payment.model.js';

User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  sequelize,
  User,
  Transaction
};
