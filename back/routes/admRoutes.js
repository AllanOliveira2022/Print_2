import express from 'express';
import { cadastrarAdministrador, listarUsuariosCompletos } from '../controllers/admController.js';
import {autenticarToken, autorizarTipo} from '../middleware/usuarioMiddleware.js'

const router = express.Router();

router.post('/cadastrar', cadastrarAdministrador);
router.get('/listartudo', autenticarToken, autorizarTipo("tecnico"), listarUsuariosCompletos);

export default router;
