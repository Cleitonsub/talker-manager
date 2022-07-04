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

module.exports = {
  getAllPeoples,
  getPeoplesById,
  login,
  addPeople,
};
