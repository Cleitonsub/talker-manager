const fs = require('fs').promises;

const HTTP_OK_STATUS = 200;

const getAllPeople = async (_req, res) => {
  const peoples = JSON.parse(await fs.readFile('./talker.json'));
  res.status(HTTP_OK_STATUS).json(peoples);
};

module.exports = {
  getAllPeople,
};
