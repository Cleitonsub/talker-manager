const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  getAllPeoples,
  getPeoplesById,
  login,
  addPeople,
  updatePeopleById,
  delPeopleById,
  searchQuery,
} = require('./services/index');
const {
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  dateValidation,
  rateValidation,
} = require('./middlewares/index');
const helpers = require('./helpers/index.js');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(helpers.httpStatusCodes.OK).send();
});

app.get('/talker', getAllPeoples);
app.get('/talker/search', tokenValidation, searchQuery);
app.get('/talker/:id', getPeoplesById);
app.post('/login', emailValidation, passwordValidation, login);
app.post('/talker',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
dateValidation,
rateValidation,
addPeople);
app.put('/talker/:id',
tokenValidation,
nameValidation,
ageValidation,
talkValidation,
dateValidation,
rateValidation,
updatePeopleById);
app.delete('/talker/:id', tokenValidation, delPeopleById);

app.listen(helpers.httpStatusCodes.PORT, () => {
  console.log('Online');
});
