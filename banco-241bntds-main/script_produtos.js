// Obtém a tabela de produtos do DOM
const tabela = document.getElementById("tabela_produtos");

// Obtém a lista de produtos do localStorage
let produtos = JSON.parse(localStorage.getItem("produtos"));

// Se não houver produtos armazenados, inicializa um array vazio e recarrega a página
if (!produtos) {
    localStorage.setItem("produtos", JSON.stringify([]));
    location.reload();
}

// Itera sobre a lista de produtos e adiciona cada produto como uma nova linha na tabela
for (let index = 0; index < produtos.length; index++) {
    const produto = produtos[index];
    const linha = `
        <tr>
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.descricao}</td>
            <td class="text-center">
                <div class="btn btn-warning" onClick="editarProduto(${produto.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarProduto(${produto.id})">Apagar</div>
            </td>
        </tr>
    `;
    tabela.innerHTML += linha;
}

// Função para editar um produto
function editarProduto(id) {
    // Procura o produto pelo ID
    const produto = procurarProdutoById(id);
    // Abre o modal de edição
    var modal = new bootstrap.Modal(document.getElementById('modal_editar'));
    const produtoId = document.getElementById("produto-id-editar");
    const nome = document.getElementById("produto-nome-editar");
    const quantidade = document.getElementById("produto-quantidade-editar");
    const descricao = document.getElementById("produto-descricao-editar");

    // Preenche os campos do modal com os dados do produto
    nome.value = produto.nome;
    quantidade.value = produto.quantidade;
    descricao.value = produto.descricao;
    produtoId.value = id;

    // Exibe o modal
    modal.show();
}

// Função para apagar um produto
function apagarProduto(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá desfazer esta ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Encontra o índice do produto a ser removido
            const usuarioARemover = produtos.findIndex(produto => produto.id == id);
            // Remove o produto da lista
            produtos.splice(usuarioARemover, 1);
            // Atualiza o localStorage com a nova lista
            localStorage.setItem('produtos', JSON.stringify(produtos));
            // Recarrega a página
            location.reload();
        }
    });
}

// Adiciona um evento de submit ao formulário de cadastro
const formularioCadastro = document.getElementById("cadastro");
formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    const produto = document.getElementById("produto-nome").value;
    const quantidade = document.getElementById("produto-quantidade").value;
    const descricao = document.getElementById("produto-descricao").value;

    // Obtém a lista de produtos do localStorage ou inicializa uma lista vazia
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    // Determina o próximo ID com base no último ID da lista
    const ultimoID = produtos[produtos.length - 1]?.id || 0;
    const produtoAdd = {
        id: ultimoID + 1,
        nome: produto,
        quantidade: quantidade,
        descricao: descricao
    };

    // Adiciona o novo produto à lista e atualiza o localStorage
    produtos.push(produtoAdd);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    // Recarrega a página
    location.reload();
});

// Adiciona um evento de submit ao formulário de edição
const formularioEditar = document.getElementById("editar_modal");
formularioEditar.addEventListener("submit", (event) => {
    event.preventDefault();
    const produtoId = document.getElementById("produto-id-editar").value;
    const nome = document.getElementById("produto-nome-editar").value;
    const quantidade = document.getElementById("produto-quantidade-editar").value;
    const descricao = document.getElementById("produto-descricao-editar").value;
    
    // Obtém a lista de produtos do localStorage
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    // Atualiza o produto correspondente ao ID fornecido
    produtos = produtos.map(produto => produto.id == produtoId ? { ...produto, nome, quantidade, descricao } : produto);
    // Atualiza o localStorage com a nova lista
    localStorage.setItem("produtos", JSON.stringify(produtos));
    // Recarrega a página
    location.reload();
});

// Função para procurar um produto pelo ID
function procurarProdutoById(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const found = produtos.find((produto) => produto.id == id);
    return found;
}
