import express from 'express';
import { cadastrarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarUsuario);

export default router;
