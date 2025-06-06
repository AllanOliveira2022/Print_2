import db from '../models/index.js'; 
import { Op } from 'sequelize';

// Função para listar todos os blocos
async function listarTodosBlocos(req, res) {
  try {
    const blocos = await db.Bloco.findAll({ 
      order: [['nome', 'ASC']]
    });
    res.status(200).json(blocos);
  } catch (error) {
    console.error("Erro ao listar blocos:", error);
    res.status(500).json({ message: 'Erro ao listar blocos', error: error.message });
  }
}

// Função para cadastrar um novo bloco
async function cadastrarBloco(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'O nome do bloco é obrigatório' });
    }

    const blocoExistente = await db.Bloco.findOne({ where: {nome}});

    if (blocoExistente) {
      return res.status(409).json({ message: 'Já existe um bloco com este nome.' });
    }

    const novoBloco = await db.Bloco.create({ nome }); 
    res.status(201).json({message: 'Bloco cadastrado com sucesso!',novoBloco});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar bloco', error: error.message });
  }
}

// Função para buscar um bloco por ID
async function buscarBlocoPorId(req, res) {
  try {
    const { id } = req.params;
    const bloco = await db.Bloco.findByPk(id); 

    if (!bloco) {
      return res.status(404).json({ message: 'Bloco não encontrado' });
    }

    res.status(200).json(bloco);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar bloco', error: error.message });
  }
}

// Função para editar um bloco
async function editarBloco(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'O nome do bloco é obrigatório para edição.' });
    }

    const bloco = await db.Bloco.findByPk(id); 
    if (!bloco) {
      return res.status(404).json({ message: 'Bloco não encontrado para edição.' });
    }

    const blocoExistenteComMesmoNome = await db.Bloco.findOne({ 
      where: {
        nome: { [Op.iLike]: nome },
        id: { [Op.ne]: id } 
      }
    });

    if (blocoExistenteComMesmoNome) {
      return res.status(409).json({ message: 'Já existe outro bloco com este nome.' });
    }

    bloco.nome = nome;
    await bloco.save();
    res.status(200).json({ message: 'Bloco atualizado com sucesso.', bloco });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar bloco.', error: error.message });
  }
}

// Função para excluir um bloco
async function excluirBloco(req, res) {
  try {
    const { id } = req.params;
    const bloco = await db.Bloco.findByPk(id); 

    if (!bloco) {
      return res.status(404).json({ message: 'Bloco não encontrado para exclusão.' });
    }

    // Verificação se o bloco está sendo usado por algum espaço
    const espacosNoBloco = await db.Espaco.count({ where: { blocoId: id } }); 
    if (espacosNoBloco > 0) {
      return res.status(400).json({ message: 'Não é possível excluir o bloco pois ele está associado a espaços.' });
    }

    await bloco.destroy();
    res.status(200).json({ message: 'Bloco excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir bloco.', error: error.message });
  }
}


export default {
  listarTodosBlocos,
  cadastrarBloco,
  buscarBlocoPorId,
  editarBloco,
  excluirBloco
};