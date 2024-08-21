const {body, validationResult, param} = require('express-validator');

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
  

const validarTitulo = [
  param('titulo').trim().escape().isLength({ min: 1 }).withMessage('Título é obrigatório'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validarPost = [
  body('titulo').trim().escape().isLength({ min: 1 }).withMessage('Título é obrigatório'),
  body('imagem').trim().escape().isURL().withMessage('Imagem deve ser uma URL válida'),
  body('conteudo').trim().escape().isLength({ min: 1 }).withMessage('Conteúdo é obrigatório'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
    validarLogin,
    validarTitulo,
    validarPost
}