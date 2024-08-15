const fs = require('fs');
const path = require('path');

const logMiddleware = (req, res, next) => {
    const logPath = path.join(__dirname, 'logs', 'security.log');
    const accessMessage = `${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${req.ip}\n`;

  
    fs.appendFile(logPath, accessMessage, (err) => {
        if (err) {
            console.error('Erro ao registrar log de acesso:', err);
        }
    });

  
    res.on('finish', () => {
        if (res.statusCode >= 400) {
            const errorMessage = `${new Date().toISOString()} - ERROR ${res.statusCode} - ${req.method} ${req.originalUrl} - ${req.ip}\n`;
            fs.appendFile(logPath, errorMessage, (err) => {
                if (err) {
                    console.error('Erro ao registrar log de erro:', err);
                }
            });
        }
    });

    next();
};

module.exports = logMiddleware;