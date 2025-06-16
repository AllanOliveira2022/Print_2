import db from '../models/index.js';
import bcrypt from 'bcrypt';
export const cadastrarProfessor = async (req, res) => {
  const { nome, email, senha, codigo_institucional, area_atuacao } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'ERRO! - Email já cadastrado.' });
    }

    const codigoExistente = await db.Professor.findOne({ where: { codigo_institucional } });
    if (codigoExistente) {
      return res.status(400).json({ message: 'ERRO! - Codigo insttucional já cadastrado já cadastrado.' });
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

export const verPerfil = async (req, res) => {
  const { id } = req.params; // O ID virá da rota

  try {
    const professor = await db.Usuario.findOne({
      where: { id, tipo: 'professor' },
      include: {
        model: db.Professor,
        as: 'Professor', 
        attributes: ['codigo_institucional', 'area_atuacao']
      },
      attributes: ['nome', 'email', 'senha']
    });

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }

    res.status(200).json(professor);
  } catch (error) {
    console.error('Erro ao buscar perfil do professor:', error);
    res.status(500).json({ message: 'Erro interno ao buscar perfil do professor.' });
  }
};

export const editarPerfil = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, codigo_institucional, area_atuacao } = req.body;

  try {
    const professor = await db.Usuario.findOne({
      where: { id, tipo: 'professor' },
      include: {
        model: db.Professor,
        as: 'Professor' // Certifique-se de que esse alias está correto nas associações
      }
    });

    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado.' });
    }

    // Verificar se o novo e-mail já existe em outro usuário
    if (email && email !== professor.email) {
      const emailExistente = await db.Usuario.findOne({
        where: { email, id: { [db.Sequelize.Op.ne]: id } }
      });
      if (emailExistente) {
        return res.status(400).json({ message: 'ERRO! - Email já cadastrado.' });
      }
    }

    // Verificar se o novo código institucional já está em uso por outro professor
    if (codigo_institucional && codigo_institucional !== professor.Professor.codigo_institucional) {
      const codigoExistente = await db.Professor.findOne({
        where: { codigo_institucional, id: { [db.Sequelize.Op.ne]: id } }
      });
      if (codigoExistente) {
        return res.status(400).json({ message: 'ERRO! - Código institucional já cadastrado.' });
      }
    }

    // Atualiza os dados do usuário
    const dadosUsuario = {
      nome: nome || professor.nome,
      email: email || professor.email
    };

    if (senha) {
      const senhaCriptografada = await bcrypt.hash(senha, 10);
      dadosUsuario.senha = senhaCriptografada;
    }

    await professor.update(dadosUsuario);

    // Atualiza os dados do professor
    await professor.Professor.update({
      codigo_institucional: codigo_institucional || professor.Professor.codigo_institucional,
      area_atuacao: area_atuacao || professor.Professor.area_atuacao
    });

    res.status(200).json({ message: 'Perfil do professor atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao editar perfil do professor:', error);
    res.status(500).json({ message: 'Erro interno ao editar perfil do professor.' });
  }
};



