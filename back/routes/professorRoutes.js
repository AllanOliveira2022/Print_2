import express from 'express';
import { cadastrarProfessor, verPerfil, editarPerfil } from '../controllers/professorController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarProfessor);
router.get('/:id', verPerfil);

router.put('/editar/:id', editarPerfil);

export default router;
