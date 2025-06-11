import express from 'express';
import { cadastrarAdministrador, listarProfessores } from '../controllers/admController.js';
import {autenticarToken, autorizarTipo} from '../middleware/usuarioMiddleware.js'

const router = express.Router();

router.post('/cadastrar', cadastrarAdministrador);
router.get('/listarprof', listarProfessores);

export default router;
