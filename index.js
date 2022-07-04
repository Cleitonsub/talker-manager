const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const services = require('./services/index');
const middlewares = require('./middlewares/index');
const helpers = require('./helpers/index.js');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(helpers.httpStatusCodes.OK).send();
});

app.get('/talker', services.getAllPeoples);
app.get('/talker/:id', services.getPeoplesById);
app.post('/login', middlewares.emailValidation, middlewares.passwordValidation, services.login);
app.post('/talker',
middlewares.tokenValidation,
middlewares.nameValidation,
middlewares.ageValidation,
middlewares.talkValidation,
middlewares.dateValidation,
middlewares.rateValidation,
services.addPeople);
app.put('/talker/:id',
middlewares.tokenValidation,
middlewares.nameValidation,
middlewares.ageValidation,
middlewares.talkValidation,
middlewares.dateValidation,
middlewares.rateValidation,
services.updatePeopleById);
app.delete('/talker/:id', middlewares.tokenValidation, services.delPeopleById);

app.listen(helpers.httpStatusCodes.PORT, () => {
  console.log('Online');
});
