import db from '../models/index.js';

export const cadastrarProfessor = async (req, res) => {
  const { nome, email, senha, codigo_institucional, area_atuacao } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha,
      tipo: 'professor'
    });

    await db.Professor.create({
      id: novoUsuario.id,
      codigo_institucional,
      area_atuacao
    });

    res.status(201).json({ message: 'Professor cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar professor:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar professor.' });
  }
};
