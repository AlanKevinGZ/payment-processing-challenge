import 'dotenv/config';
import app, { connectDB } from './app.js';

const PORT = process.env.PORT || 4000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer();
