export const formatTransactionResponse = (transaction) => {
  const {
    id,
    userId,
    amount,
    currency,
    status,
    cardLast4,
    cardType,
    createdAt,
    updatedAt,
    user,
  } = transaction;

  return {
    id,
    userId,
    amount,
    currency,
    status,
    cardLast4,
    cardType,
    createdAt,
    updatedAt,
    user: {
      name: user?.name || null,
    }

  };
};
