const dadosFront = "assets/dados.json";
let produtos = [];

fetch(dadosFront)
    .then(resp => resp.json())
    .then(dados => {
        produtos = dados;
        mostrarProdutos(produtos);
    })
    .catch(error => {
        console.error('Erro ao carregar produtos:', error);
    });

// Função para exibir os livros (produtos)
function mostrarProdutos(livros) {
    const container = document.getElementById('livros-container'); // Corrigido para bater com o HTML
    container.innerHTML = ''; // Limpa o container antes de adicionar

    livros.forEach((livro, index) => {
        const card = `
            <div class="card">
                <h2>${livro.titulo}</h2>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Ano:</strong> ${livro.ano}</p>
                <p><strong>Editora:</strong> ${livro.editora}</p>
                <p>${livro.descricao}</p>
                <button onclick="mostrarDetalhes(${index})">Detalhes</button>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Mostrar detalhes no modal
function mostrarDetalhes(index) {
    const livro = produtos[index];
    const conteudo = document.getElementById('conteudo');

    conteudo.innerHTML = `
        <h3>${livro.titulo}</h3>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano}</p>
        <p><strong>Editora:</strong> ${livro.editora}</p>
        <p><strong>Gênero:</strong> ${livro.genero}</p>
        <p>${livro.descricao}</p>
    `;

    document.getElementById('detalhes').classList.remove('oculto');

    // Define o id para uso no cadastro
    document.getElementById('cadastrodelocacao').setAttribute('data-id', livro.id);
}

// Função para fechar o modal (opcional, caso queira adicionar um botão "Fechar")
function fecharModal() {
    document.getElementById('detalhes').classList.add('oculto');
}

// Função para simular locação
function cadastrodelocacao() {
    const idLivro = document.getElementById('cadastrodelocacao').getAttribute('data-id');
    const livro = produtos.find(l => l.id == idLivro);

    let locacoes = JSON.parse(localStorage.getItem('locacoes')) || [];
    locacoes.push(livro);

    localStorage.setItem('locacoes', JSON.stringify(locacoes));
    fecharModal();
}
