import express from 'express';
import { cadastrarUsuario, login, excluirUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarUsuario);
router.post('/login', login)

router.delete('/deletar/:id', excluirUsuario);

export default router;
