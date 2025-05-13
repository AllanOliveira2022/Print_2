import express from 'express';
import cors from 'cors';

import alunoRoutes from './routes/alunoRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import admRoutes from './routes/admRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
const app = express();

app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000', // URL do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true // Se você usa cookies/tokens
  }));

  app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/administradores', admRoutes);


  export default app;

  