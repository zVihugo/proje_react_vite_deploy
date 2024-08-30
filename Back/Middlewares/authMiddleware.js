const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers['authorization'];


  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);


  if (!token) {
    return res.status(401).json({ success: false, message: 'Token não encontrado' });
  }

  try {

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('Secret do JWT não configurado.');
    }


    jwt.verify(token, secret);

  
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error.message);
    return res.status(401).json({ success: false, message: 'Token inválido ou expirado. Faça login novamente.' });
  }
};

module.exports = authMiddleware;
