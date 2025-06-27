import express from 'express';
import cors from 'cors';

import professorRoutes from './routes/professorRoutes.js';
import admRoutes from './routes/admRoutes.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import espacoRoutes from './routes/espacoRoutes.js'
import blocoRoutes from './routes/blocoRoutes.js'
import tipoRoutes from './routes/tipoRoutes.js'
import solicitacaoRoutes from './routes/solicitacaoRoutes.js'
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
app.use('/api/professores', professorRoutes);
app.use('/api/administradores', admRoutes);
app.use('/api/espacos', espacoRoutes);

app.use('/api/blocos', blocoRoutes);

app.use('/api/tipos', tipoRoutes);

//reservas
app.use('/api/solicitacao', solicitacaoRoutes)

  export default app;

  