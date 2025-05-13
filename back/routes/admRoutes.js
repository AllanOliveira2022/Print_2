import express from 'express';
import { cadastrarAdministrador } from '../controllers/admController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarAdministrador);

export default router;
