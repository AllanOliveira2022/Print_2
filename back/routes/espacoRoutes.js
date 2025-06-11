import express from 'express';
import { 
    cadastrarEspaco, listarEspacos, listarEspacosId, buscarEspacos, filtrarEspaco, excluirEspaco, editarEspaco, ordenarEspaco
} from '../controllers/espacoController.js';

import {autorizarTipo, autenticarToken} from '../middleware/usuarioMiddleware.js'

const router = express.Router();

// Rotas principais
router.post('/cadastrar', cadastrarEspaco);
router.get('/listar', listarEspacos);
router.get('/:id', listarEspacosId);
router.delete('/:id', excluirEspaco);
router.put('/:id', editarEspaco)

//busca-filtro-ordena
router.get('/buscar/:nomeEspaco', buscarEspacos);
router.get('/filtrar/:tipo/:valor', filtrarEspaco);
router.get('/ordenar/:ordem', ordenarEspaco);
/*
router.get('/', listarLaboratorios);
router.get('/filtrar', filtrarLaboratorios);
router.get('/:id', buscarLaboratorioPorId);
router.put('/:id', editarLaboratorio);
router.delete('/:id', excluirLaboratorio);*/

export default router;