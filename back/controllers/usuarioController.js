import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import db from '../models/index.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await db.Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    // Token JWT
    const token = jwt.sign(
      { id: usuario.id, tipo: usuario.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Monta os dados adicionais conforme o tipo
    let dadosExtras = {};
    if (usuario.tipo === 'professor') {
      const professor = await db.Professor.findOne({ where: { id: usuario.id } });
      if (professor) {
        dadosExtras = {
          codigo_institucional: professor.codigo_institucional,
          area_atuacao: professor.area_atuacao
        };
      }
    }

    // Resposta
    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo: usuario.tipo,
        ...dadosExtras
      }
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno ao fazer login.' });
  }
};


export const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    const novoUsuario = await db.Usuario.create({ nome, email, senha, tipo });

    const user = novoUsuario.get({ plain: true });
    delete user.senha; 

    res.status(201).json({ message: 'Usuário cadastrado com sucesso.', user });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro interno ao cadastrar usuário.' });
  }
};

export const excluirUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await db.Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    await usuario.destroy();

    res.status(200).json({ message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ message: 'Erro interno ao excluir usuário.' });
  }
};

