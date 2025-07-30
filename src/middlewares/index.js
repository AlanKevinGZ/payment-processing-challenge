import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

export default function setupMiddleware(app) {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());
}
