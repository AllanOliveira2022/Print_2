import db from '../models/index.js';

export const cadastrarAluno = async (req, res) => {
  const { nome, email, senha, matricula } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }
    const matriculaExistente = await db.Aluno.findOne({ where: { matricula } });
    if (matriculaExistente) {
      return res.status(400).json({ message: 'Matricula já cadastrada.' });
    }

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha,
      tipo: 'aluno'
    });

    await db.Aluno.create({
      id: novoUsuario.id,
      matricula
    });

    res.status(201).json({ message: 'Aluno cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar aluno:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar aluno.' });
  }
};
