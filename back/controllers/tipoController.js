import { TipoLab } from '../models/index.js'; // Modelo TipoLab
import { Op } from 'sequelize';

// Função para listar todos os tipos de laboratório/espaço
async function listarTodosTiposLab(req, res) {
  try {
    const tipos = await TipoLab.findAll({
      order: [['nome', 'ASC']] // Opcional: ordena os tipos por nome
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

    const tipoExistente = await TipoLab.findOne({
      where: {
        nome: {
          [Op.iLike]: nome
        }
      }
    });

    if (tipoExistente) {
      return res.status(409).json({ message: 'Já existe um tipo com este nome.' });
    }

    const novoTipo = await TipoLab.create({ nome });
    res.status(201).json(novoTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar tipo.', error: error.message });
  }
}

// Função para buscar um tipo por ID
async function buscarTipoPorId(req, res) {
  try {
    const { id } = req.params;
    const tipo = await TipoLab.findByPk(id);

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

    const tipo = await TipoLab.findByPk(id);
    if (!tipo) {
      return res.status(404).json({ message: 'Tipo não encontrado para edição.' });
    }

    const tipoExistenteComMesmoNome = await TipoLab.findOne({
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
    const tipo = await TipoLab.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ message: 'Tipo não encontrado para exclusão.' });
    }

    await tipo.destroy();
    res.status(200).json({ message: 'Tipo excluído com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir tipo.', error: error.message });
  }
}


export default {
  listarTodosTiposLab, // Adicionada a nova função
  cadastrarTipo,
  buscarTipoPorId,
  editarTipo,
  excluirTipo
};