const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ msg: 'Token nao inserido' });
    }
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        console.log("nao tem token")
      return res.status(401).json({ msg: 'Acesso negado' });
    }
    try {
    const secret = process.env.JWT_SECRET;

      jwt.verify(token, secret);

      next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ msg: 'token invalido, por favor faça login novamente' });
    }
};

module.exports = authMiddleware;