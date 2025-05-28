import express from 'express';
import { 
    cadastrarEspaco
} from '../controllers/espacoController.js';

const router = express.Router();

// Rotas principais
router.post('/cadastrar', cadastrarEspaco);

/*
router.get('/', listarLaboratorios);
router.get('/filtrar', filtrarLaboratorios);
router.get('/:id', buscarLaboratorioPorId);
router.put('/:id', editarLaboratorio);
router.delete('/:id', excluirLaboratorio);*/

export default router;