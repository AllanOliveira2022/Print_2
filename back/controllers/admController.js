import db from '../models/index.js';

export const cadastrarAdministrador = async (req, res) => {
  const { nome, email, senha, codigo_institucional } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const codigoExistente = await db.TecnicoAdministrador.findOne({ where: { codigo_institucional } });
    if (codigoExistente) {
      return res.status(400).json({ message: 'Codigo insttucional já cadastrado já cadastrado.' });
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

// mostra todos os dados dos professores
export const listarProfessores = async (req, res) => {
  try {
      const [professores, metadata] = await db.sequelize.query(`
          SELECT u.id, u.nome, u.email, u.tipo,
              p.codigo_institucional,
              p.area_atuacao
          FROM Usuarios u
          INNER JOIN Professores p ON p.id = u.id
          WHERE u.tipo = 'professor'
      `);

      res.status(200).json(professores);
  } catch (error) {
      console.error('Erro ao listar professores:', error);
      res.status(500).json({ erro: 'Erro ao buscar professores', detalhes: error.message });
  }
};






