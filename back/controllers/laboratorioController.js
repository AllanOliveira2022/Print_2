import db from '../models/index.js';

// Cadastrar laboratório
export const cadastrarLaboratorio = async (req, res) => {
  try {
    const {
      nome,
      codigoIdentificacao,
      blocoDidatico,
      numero,
      tipoLaboratorio,
      capacidade,
      quantidadeComputadores,
      equipamentosDisponiveis,
      softwaresInstalados,
      capacidadePCD,
      responsavel,
      observacoes,
      situacao
    } = req.body;

    const laboratorioExistente = await db.Laboratorio.findOne({ where: { codigoIdentificacao } });

    if (laboratorioExistente) {
      return res.status(400).json({ message: 'Já existe um laboratório com esse código de identificação.' });
    }

    const novoLaboratorio = await db.Laboratorio.create({
      nome,
      codigoIdentificacao,
      blocoDidatico,
      numero,
      tipoLaboratorio,
      capacidade,
      quantidadeComputadores,
      equipamentosDisponiveis,
      softwaresInstalados,
      capacidadePCD,
      responsavel,
      observacoes,
      situacao
    });

    return res.status(201).json({ message: 'Laboratório cadastrado com sucesso.', laboratorio: novoLaboratorio });
  } catch (error) {
    console.error('Erro ao cadastrar laboratório:', error);
    return res.status(500).json({ message: 'Erro interno ao cadastrar laboratório.', detalhes: error.message });
  }
};

// Listar todos os laboratórios
export const listarLaboratorios = async (req, res) => {
  try {
    const laboratorios = await db.Laboratorio.findAll({
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ laboratorios });
  } catch (error) {
    console.error('Erro ao listar laboratórios:', error);
    return res.status(500).json({ message: 'Erro interno ao listar laboratórios.', detalhes: error.message });
  }
};

// Buscar laboratório por ID
export const buscarLaboratorioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const laboratorio = await db.Laboratorio.findByPk(id);

    if (!laboratorio) {
      return res.status(404).json({ message: 'Laboratório não encontrado.' });
    }

    return res.status(200).json({ laboratorio });
  } catch (error) {
    console.error('Erro ao buscar laboratório:', error);
    return res.status(500).json({ message: 'Erro interno ao buscar laboratório.', detalhes: error.message });
  }
};

// Editar laboratório
export const editarLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      codigoIdentificacao,
      blocoDidatico,
      numero,
      tipoLaboratorio,
      capacidade,
      quantidadeComputadores,
      equipamentosDisponiveis,
      softwaresInstalados,
      capacidadePCD,
      responsavel,
      observacoes,
      situacao
    } = req.body;

    const laboratorio = await db.Laboratorio.findByPk(id);

    if (!laboratorio) {
      return res.status(404).json({ message: 'Laboratório não encontrado.' });
    }

    // Verificar se o código de identificação já existe em outro laboratório
    if (codigoIdentificacao !== laboratorio.codigoIdentificacao) {
      const laboratorioExistente = await db.Laboratorio.findOne({ 
        where: { codigoIdentificacao },
        where: { id: { [db.Sequelize.Op.ne]: id } } // Não incluir o próprio laboratório na busca
      });

      if (laboratorioExistente) {
        return res.status(400).json({ message: 'Já existe um laboratório com esse código de identificação.' });
      }
    }

    const laboratorioAtualizado = await laboratorio.update({
      nome,
      codigoIdentificacao,
      blocoDidatico,
      numero,
      tipoLaboratorio,
      capacidade,
      quantidadeComputadores,
      equipamentosDisponiveis,
      softwaresInstalados,
      capacidadePCD,
      responsavel,
      observacoes,
      situacao
    });

    return res.status(200).json({ 
      message: 'Laboratório atualizado com sucesso.', 
      laboratorio: laboratorioAtualizado 
    });
  } catch (error) {
    console.error('Erro ao editar laboratório:', error);
    return res.status(500).json({ message: 'Erro interno ao editar laboratório.', detalhes: error.message });
  }
};

// Excluir laboratório
export const excluirLaboratorio = async (req, res) => {
  try {
    const { id } = req.params;

    const laboratorio = await db.Laboratorio.findByPk(id);

    if (!laboratorio) {
      return res.status(404).json({ message: 'Laboratório não encontrado.' });
    }

    await laboratorio.destroy();

    return res.status(200).json({ message: 'Laboratório excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir laboratório:', error);
    return res.status(500).json({ message: 'Erro interno ao excluir laboratório.', detalhes: error.message });
  }
};

// Buscar laboratórios com filtros
export const filtrarLaboratorios = async (req, res) => {
  try {
    const { nome, tipo, bloco, situacao } = req.query;
    
    const where = {};
    
    if (nome) {
      where.nome = { [db.Sequelize.Op.iLike]: `%${nome}%` };
    }
    
    if (tipo) {
      where.tipoLaboratorio = { [db.Sequelize.Op.iLike]: `%${tipo}%` };
    }
    
    if (bloco) {
      where.blocoDidatico = bloco;
    }
    
    if (situacao) {
      where.situacao = situacao;
    }

    const laboratorios = await db.Laboratorio.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ laboratorios });
  } catch (error) {
    console.error('Erro ao filtrar laboratórios:', error);
    return res.status(500).json({ message: 'Erro interno ao filtrar laboratórios.', detalhes: error.message });
  }
};