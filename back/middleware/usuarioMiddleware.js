import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Verifica se o token JWT está presente e é válido
export const autenticarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Esperado: "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }

    req.usuario = usuario; // o `usuario` vem do payload do JWT
    next();
  });
};

// Middleware para verificar se o usuário tem o tipo certo (ex: 'admin', 'aluno', etc.)
export const autorizarTipo = (tipoPermitido) => {
  return (req, res, next) => {
    if (req.usuario.tipo !== tipoPermitido) {
      return res.status(403).json({ message: 'Acesso negado para este tipo de usuário.' });
    }
    next();
  };
};
