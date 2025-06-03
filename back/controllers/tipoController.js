import db from '../models/index.js'; 
import { Op } from 'sequelize';

// Função para listar todos os tipos de laboratório/espaço
async function listarTodosTiposLab(req, res) {
  try {
    const tipos = await db.Tipo.findAll({ 
      order: [['nome', 'ASC']] 
    });
    res.status(200).json(tipos);
  } catch (error) {
    console.error("Erro ao listar tipos de laboratório:", error);
    res.status(500).json({ message: 'Erro ao listar tipos de laboratório', error: error.message });
  }
}

// Função para cadastrar um novo tipo de laboratório/espaço
async function cadastrarTipo(req, res) {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'O nome do tipo é obrigatório.' });
    }

    const tipoExistente = await db.Tipo.findOne({where: {nome}});

    if (tipoExistente) {
      return res.status(409).json({ message: 'Já existe um tipo com este nome.' });
    }

    const novoTipo = await db.Tipo.create({ nome }); 
    res.status(201).json({message: 'Tipo cadastrado com sucesso!',novoTipo});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar tipo.', error: error.message });
  }
}

// Função para buscar um tipo por ID
async function buscarTipoPorId(req, res) {
  try {
    const { id } = req.params;
    const tipo = await db.Tipo.findByPk(id); 

    if (!tipo) {
      return res.status(404).json({ message: 'Tipo não encontrado.' });
    }

    res.status(200).json(tipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar tipo.', error: error.message });
  }
}

// Função para editar um tipo de laboratório/espaço
async function editarTipo(req, res) {
  try {
    const { id } = req.params;
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ message: 'O nome do tipo é obrigatório para edição.' });
    }

    const tipo = await db.Tipo.findByPk(id); 
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo não encontrado para edição.' });
    }

    const tipoExistenteComMesmoNome = await db.Tipo.findOne({ 
      where: {
        nome: { [Op.iLike]: nome },
        id: { [Op.ne]: id } 
      }
    });

    if (tipoExistenteComMesmoNome) {
      return res.status(409).json({ message: 'Já existe outro tipo com este nome.' });
    }

    tipo.nome = nome;
    await tipo.save();
    res.status(200).json({ message: 'Tipo atualizado com sucesso.', tipo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar tipo.', error: error.message });
  }
}

// Função para excluir um tipo de laboratório/espaço
async function excluirTipo(req, res) {
  try {
    const { id } = req.params;
    const tipo = await db.Tipo.findByPk(id); 

    if (!tipo) {
      return res.status(404).json({ message: 'Tipo não encontrado para exclusão.' });
    }
    
    // Verificação se o tipo está sendo usado por algum espaço
    const espacosDoTipo = await db.Espaco.count({ where: { tipo_id: id } }); 
    if (espacosDoTipo > 0) {
      return res.status(400).json({ message: 'Não é possível excluir o tipo pois ele está associado a espaços.' });
    }

    await tipo.destroy();
    res.status(200).json({ message: 'Tipo excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir tipo.', error: error.message });
  }
}

export default {
  listarTodosTiposLab,
  cadastrarTipo,
  buscarTipoPorId,
  editarTipo,
  excluirTipo
};