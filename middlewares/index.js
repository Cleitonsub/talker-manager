const helpers = require('../helpers/index.js');

// Regex inspirado no site:
// https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascrip/
const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /@/ && /.com/;

  if (!email) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  const emailTrue = emailRegex.test(email);
  if (!emailTrue) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "password" é obrigatório',
    });
  }

  if (password.length < 6) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const tokenValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) { 
    return res.status(helpers.httpStatusCodes.UNAUTHORIZED).json({
    message: 'Token não encontrado',
    });
  }
  if (authorization.length < 16) {
    return res.status(helpers.httpStatusCodes.UNAUTHORIZED).json({
      message: 'Token inválido',
    });
  }
  next();
};

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
    message: 'O campo "name" é obrigatório',
  });
}
  if (name.length < 3) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
    message: 'O "name" deve ter pelo menos 3 caracteres',
  });
}
  next();
};

const ageValidation = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (age < 18) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const talkValidation = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  next();
};

const dateValidation = (req, res, next) => {
  const { watchedAt } = req.body.talk;

  if (!watchedAt) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateTrue = dateRegex.test(watchedAt);
  if (!dateTrue) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.body.talk;

  if (!rate) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(helpers.httpStatusCodes.BAD_REQUEST).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
};
