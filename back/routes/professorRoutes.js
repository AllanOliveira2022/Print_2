import express from 'express';
import { cadastrarProfessor } from '../controllers/professorController.js';

const router = express.Router();

router.post('/cadastrar', cadastrarProfessor);

export default router;
