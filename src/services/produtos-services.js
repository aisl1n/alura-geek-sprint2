const listaProdutos = async () => {
  try {
    const resposta = await fetch(
      'https://64b9a04479b7c9def6c13b6d.mockapi.io/produto'
    );
    return await resposta.json();
  } catch (error) {
    return console.log(error);
  }
};

const getProdutoPorId = async (id) => {
  try {
    const resposta = await fetch(
      `https://64b9a04479b7c9def6c13b6d.mockapi.io/produto/${id}`
    );
    return await resposta.json();
  } catch (error) {
    return console.log(error);
  }
};

export const produtoServicos = {
  listaProdutos,
  getProdutoPorId,
};
