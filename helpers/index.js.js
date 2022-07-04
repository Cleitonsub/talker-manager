// Com base em pesquisa no Stackoverflow
// https://stackoverflow.com/questions/8532406/
// create-a-random-token-in-javascript-based-on-user-details
// Math.random() é criado um número aleatório e toString(36) converte para string e
// substr(2) remove o 0. do início e substr(0, 16) pega apenas os primeiros 16 da string formada

const tokenGenerator = () => {
  const random = Math.random().toString(36).substr(2);
  const random16 = random + random;
  return random16.substr(0, 16);
};

module.exports = {
  tokenGenerator,
};
