import express from 'express';
import { cadastrarLaboratorio } from '../controllers/laboratorioController.js';


const router = express.Router();

router.post('/cadastrar', cadastrarLaboratorio);

export default router;
