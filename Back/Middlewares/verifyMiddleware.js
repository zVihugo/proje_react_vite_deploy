const {body, validationResult} = require('express-validator');

const validarLogin = [
    body('username').isString().notEmpty().withMessage('O nome de usuário é obrigatório'),
    body('password').isString().notEmpty().withMessage('A senha é obrigatória')
      .custom(value => {
        if (value.includes('; rm -rf /')) {
          throw new Error('Algo detectado');
        }
        return true;
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    }
  ];
  

const validarInserir = [
    body('titulo').isString().notEmpty().withMessage('O título é obrigatório'),
    body('conteudo').isString().notEmpty().withMessage('O conteúdo é obrigatório'),
    
]

module.exports = {
    validarLogin
}