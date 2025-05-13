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

// mostra todos os dados dos usuarios, independente do tipo
export const listarUsuariosCompletos = async (req, res) => {
  try {
      const [usuarios, metadata] = await db.sequelize.query(`
          SELECT u.id, u.nome, u.email, u.tipo,
              a.matricula,
              COALESCE(p.codigo_institucional, t.codigo_institucional) AS codigo_institucional,
              p.area_atuacao
          FROM Usuarios u
          LEFT JOIN Alunos a ON a.id = u.id
          LEFT JOIN Professores p ON p.id = u.id
          LEFT JOIN TecnicoAdministradores t ON t.id = u.id
      `);

      res.status(200).json(usuarios);
  } catch (error) {
      console.error('Erro ao listar usuários (raw):', error);
      res.status(500).json({ erro: 'Erro ao buscar usuários', detalhes: error.message });
  }
};



