import express from 'express';
import { 
    cadastrarBloco
} from '../controllers/blocoController.js';

const router = express.Router();

// Rotas principais
router.post('/cadastrar', cadastrarBloco);

export default router;