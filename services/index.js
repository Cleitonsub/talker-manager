const fs = require('fs').promises;
const helpers = require('../helpers/index.js');

const CONTENT_FILE = './talker.json';

const getAllPeoples = async (_req, res) => {
  const peoples = await helpers.readFile(CONTENT_FILE);
  res.status(helpers.httpStatusCodes.OK).json(peoples);
};

const getPeoplesById = async (req, res) => {
  const { id } = req.params;
  const peoples = await helpers.readFile(CONTENT_FILE);
  const peopleById = await peoples.find((people) => people.id === Number(id));
  if (!peopleById) {
    return res.status(helpers.httpStatusCodes.NOT_FOUND).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(helpers.httpStatusCodes.OK).json(peopleById);
};

const login = (req, res) => res.status(helpers.httpStatusCodes.OK).json({
  token: helpers.tokenGenerator(),
});

const addPeople = async (req, res) => {
  const peoples = await helpers.readFile(CONTENT_FILE);
  const writePeople = await helpers.writeFile(CONTENT_FILE, {
    id: peoples.length + 1,
    ...req.body,
  });
  return res.status(helpers.httpStatusCodes.CREATED).json(writePeople);
};

const updatePeopleById = async (req, res) => {
  const { id } = req.params;

  const peoples = await helpers.readFile(CONTENT_FILE);
  const peopleById = await peoples.find((people) => people.id === Number(id));
  const writePeople = await helpers.writeFile(CONTENT_FILE, {
    id: peopleById.id,
    ...req.body,
  });

  return res.status(helpers.httpStatusCodes.OK).json(writePeople);
};

const delPeopleById = async (req, res) => {
  const { id } = req.params;

  const peoples = await helpers.readFile(CONTENT_FILE);
  const peopleById = await peoples.filter((people) => people.id !== Number(id));
  await fs.writeFile(CONTENT_FILE, JSON.stringify(peopleById));

  return res.status(helpers.httpStatusCodes.NO_CONTENT).json();
};

const searchQuery = async (req, res) => {
  const { q } = req.query;

  const peoples = await helpers.readFile(CONTENT_FILE);
  const peopleSearch = await peoples.filter((people) => people.name.toLowerCase()
    .includes(q.toLowerCase())) || [];
    
  res.status(helpers.httpStatusCodes.OK).json(peopleSearch);
};

module.exports = {
  getAllPeoples,
  getPeoplesById,
  login,
  addPeople,
  updatePeopleById,
  delPeopleById,
  searchQuery,
};
