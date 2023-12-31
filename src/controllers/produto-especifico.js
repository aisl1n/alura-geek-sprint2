import { novoProduto } from './produtos-controllers.js';

function detalhesProdutoEspecifico(produto) {
  const detalhesProduto = document.querySelector('.produto-especifico');

  detalhesProduto.innerHTML = `
    <section class="produto-descricao">
        <img src="${produto.imageUrl}" alt="${produto.alt}">
        <div class="produto-direita">
            <h1>${produto.name}</h1>
            <span>R$ ${produto.price}</span>
            <i>${produto.description}</i>
        </div>
    </section>
    <section id="${produto.section}" class="ajuste-produto-detalhe">
        <div class="titulo">
            <h3>Produtos similares</h3>
        </div>
        <ul class="produtos"></ul>
    </section>
    `;
}

function exibirProdutosSimilares(produtos, sectionId) {
  const sectionProdutosSimilares = document.getElementById(sectionId);
  const ulProdutosSimilares =
    sectionProdutosSimilares.querySelector('.produtos');

  produtos.forEach((produto) => {
    if (produto.id !== selectedProductId) {
      const novoCard = novoProduto(
        produto.imageUrl,
        produto.name,
        produto.id,
        produto.price,
        produto.alt
      );
      ulProdutosSimilares.appendChild(novoCard);
    }
  });
}

const urlParams = new URLSearchParams(window.location.search);
const selectedProductId = urlParams.get('id');

fetch('https://64b9a04479b7c9def6c13b6d.mockapi.io/produto')
  .then((resposta) => resposta.json())
  .then((produtos) => {
    const produtoEspecifico = produtos.find(
      (produto) => produto.id === Number(selectedProductId)
    );

    if (produtoEspecifico) {
      detalhesProdutoEspecifico(produtoEspecifico);

      const produtosSimilares = produtos.filter(
        (produto) => produto.section === produtoEspecifico.section
      );
      exibirProdutosSimilares(produtosSimilares, produtoEspecifico.section);
    } else {
      console.log('Produto não encontrado');
    }
  })
  .catch((error) => console.log(error));
