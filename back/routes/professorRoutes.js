import express from 'express';
import { cadastrarProfessor, verPerfil } from '../controllers/professorController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarProfessor);
router.get('/:id', verPerfil);

export default router;
