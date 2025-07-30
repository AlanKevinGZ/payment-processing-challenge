export const sendResponse = (res, {
  status = 200,
  message = 'Operación exitosa',
  data = null
}) => {
  const payload = { message };
  if (data !== null) payload.data = data;

  return res.status(status).json(payload);
};
