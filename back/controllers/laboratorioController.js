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
