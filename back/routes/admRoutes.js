import express from 'express';
import { cadastrarAdministrador, listarUsuariosCompletos } from '../controllers/admController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarAdministrador);
router.get('/listartudo', listarUsuariosCompletos);

export default router;
