const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token inválido' });
    }
};

module.exports = authMiddleware;