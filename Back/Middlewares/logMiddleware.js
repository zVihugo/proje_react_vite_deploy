const fs = require('fs');
const path = require('path');

const logMiddleware = (req, res, next) => {
    const caminho = path.join(__dirname, 'logs', 'security.log');
    const mensagem = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}\n`;

    fs.appendFile(caminho, mensagem, (err) => {
        if (err) {
            console.error('Erro ao registrar log:', err);
            
        }
    });

    next();
};

module.exports = logMiddleware;