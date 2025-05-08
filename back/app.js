import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true // Se você usa cookies/tokens
  }));

  app.use(express.json());

  export default app;