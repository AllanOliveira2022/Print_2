import express from 'express';
import { 
    cadastrarEspaco, listarEspacos, listarEspacosId, buscarEspacos, filtrarEspaco
} from '../controllers/espacoController.js';

const router = express.Router();

// Rotas principais
router.post('/cadastrar', cadastrarEspaco);
router.get('/listar', listarEspacos);
router.get('/:id', listarEspacosId);
router.get('/buscar/:nomeEspaco', buscarEspacos);
router.get('/filtrar/:tipo/:valor', filtrarEspaco);
/*
router.get('/', listarLaboratorios);
router.get('/filtrar', filtrarLaboratorios);
router.get('/:id', buscarLaboratorioPorId);
router.put('/:id', editarLaboratorio);
router.delete('/:id', excluirLaboratorio);*/

export default router;