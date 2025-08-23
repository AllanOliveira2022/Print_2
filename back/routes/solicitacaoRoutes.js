import express from 'express';
import {fazerSolicitacao,verSolicitacoes, verSolicitacaoProf } from '../controllers/solicitacaoController.js';
// Importar middlewares de autenticação/autorização aqui.
// Ex: import { verificarToken, verificarAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota para listar todos os tipos de laboratório/espaço
// Exemplo de rota pública:
router.get('/listar', verSolicitacoes);
router.get('/listarprof/:id', verSolicitacaoProf);
// Exemplo de rota protegida:
// router.get('/listar', verificarToken, tipoController.listarTodosTiposLab);

router.post('/fazersolicitacao', fazerSolicitacao); 
//router.get('/:id', tipoController.buscarTipoPorId);
//router.put('/:id', tipoController.editarTipo); 
//router.delete('/:id', tipoController.excluirTipo);

export default router;