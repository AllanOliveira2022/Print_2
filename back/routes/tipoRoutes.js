import express from 'express';
import tipoController from '../controllers/tipoController.js';
// Importar middlewares de autenticação/autorização aqui.
// Ex: import { verificarToken, verificarAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota para listar todos os tipos de laboratório/espaço
// Exemplo de rota pública:
router.get('/listar', tipoController.listarTodosTiposLab);
// Exemplo de rota protegida:
// router.get('/listar', verificarToken, tipoController.listarTodosTiposLab);

router.post('/cadastrar', tipoController.cadastrarTipo); 
router.get('/:id', tipoController.buscarTipoPorId);
router.put('/:id', tipoController.editarTipo); 
router.delete('/:id', tipoController.excluirTipo);

export default router;