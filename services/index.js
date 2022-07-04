const helpers = require('../helpers/index.js');

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;
const CONTENT_FILE = './talker.json';

const getAllPeoples = async (_req, res) => {
  const peoples = await helpers.readFile(CONTENT_FILE);
  res.status(HTTP_OK_STATUS).json(peoples);
};

const getPeoplesById = async (req, res) => {
  const { id } = req.params;
  const peoples = await helpers.readFile(CONTENT_FILE);
  const peopleById = await peoples.find((people) => people.id === Number(id));
  if (!peopleById) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(peopleById);
};

const login = (req, res) => res.status(HTTP_OK_STATUS).json({ token: helpers.tokenGenerator() });

module.exports = {
  getAllPeoples,
  getPeoplesById,
  login,
  // addPeople,
};
