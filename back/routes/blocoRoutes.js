import express from 'express';
import blocoController from '../controllers/blocoController.js';
// Importar middlewares de autenticação/autorização aqui.
// Ex: import { verificarToken, verificarAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Rota para listar todos os blocos
// Exemplo de rota pública:
router.get('/listar', blocoController.listarTodosBlocos);
// Exemplo de rota protegida:
// router.get('/listar', verificarToken, blocoController.listarTodosBlocos);

router.post('/cadastrar', blocoController.cadastrarBloco);
router.get('/:id', blocoController.buscarBlocoPorId);
router.put('/:id', blocoController.editarBloco); 
router.delete('/:id', blocoController.excluirBloco); 

export default router;