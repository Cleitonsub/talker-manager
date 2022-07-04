const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;
const NOT_FOUND = 404;

const getAllPeoples = async (_req, res) => {
  const peoples = JSON.parse(await fs.readFile('./talker.json'));
  res.status(HTTP_OK_STATUS).json(peoples);
};

const getPeoplesById = async (req, res) => {
  const { id } = req.params;
  const peoples = JSON.parse(await fs.readFile('./talker.json'));
  const peopleById = await peoples.find((people) => people.id === Number(id));
  if (!peopleById) {
    return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(HTTP_OK_STATUS).json(peopleById);
};

module.exports = {
  getAllPeoples,
  getPeoplesById,
};
