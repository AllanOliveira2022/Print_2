import express from 'express';
import { 
  cadastrarLaboratorio, 
  listarLaboratorios,
  buscarLaboratorioPorId,
  editarLaboratorio,
  excluirLaboratorio,
  filtrarLaboratorios
} from '../controllers/laboratorioController.js';

const router = express.Router();

// Rotas principais
router.post('/cadastrar', cadastrarLaboratorio);
router.get('/', listarLaboratorios);
router.get('/filtrar', filtrarLaboratorios);
router.get('/:id', buscarLaboratorioPorId);
router.put('/:id', editarLaboratorio);
router.delete('/:id', excluirLaboratorio);

export default router;