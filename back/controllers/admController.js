import db from '../models/index.js';

export const cadastrarAdministrador = async (req, res) => {
  const { nome, email, senha, codigo_institucional } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const novoUsuario = await db.Usuario.create({
      nome,
      email,
      senha,
      tipo: 'tecnico'
    });

    await db.TecnicoAdministrador.create({
      id: novoUsuario.id,
      codigo_institucional
    });

    res.status(201).json({ message: 'Administrador cadastrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao cadastrar administrador:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar administrador.' });
  }
};
