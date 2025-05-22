import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import db from '../models/index.js';

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
