import express from 'express';
import { cadastrarAluno } from '../controllers/alunoController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarAluno);

export default router;
