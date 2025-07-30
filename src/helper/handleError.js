export const handleErrorResponse = (res, error, statusCode = 500, message = 'Error del servidor') => {
  res.status(statusCode).json({
    message,
    error: error.message
  });
};
