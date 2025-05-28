import express from 'express';
import { 
    cadastrarTipo
} from '../controllers/tipoController.js';

const router = express.Router();

// Rotas principais
router.post('/cadastrar', cadastrarTipo);

export default router;