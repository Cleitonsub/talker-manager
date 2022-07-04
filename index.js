const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const services = require('./services/index');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', services.getAllPeoples);
app.get('/talker/:id', services.getPeoplesById);
app.post('/login', services.login);

app.listen(PORT, () => {
  console.log('Online');
});
