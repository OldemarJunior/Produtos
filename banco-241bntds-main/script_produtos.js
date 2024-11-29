const tabela = document.getElementById("tabela_produtos")
let produtos = JSON.parse(localStorage.getItem("produtos"))

if (!produtos) {
    localStorage.setItem("produtos", JSON.stringify([]))
    location.reload()
}

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
    `
    tabela.innerHTML += linha
}

function editarProduto(id) {
    const produto = procurarProdutoById(id); // Certifique-se de que o nome da função e a variável estão corretos
    // abrir modal do id modal_editar
    var modal = new bootstrap.Modal(document.getElementById('modal_editar'));
    const produtoId = document.getElementById("produto-id-editar")
    const nome = document.getElementById("produto-nome-editar");
    const quantidade = document.getElementById("produto-quantidade-editar");
    const descricao = document.getElementById("produto-descricao-editar");

    nome.value = produto.nome; // Certifique-se de que as propriedades estão corretas
    quantidade.value = produto.quantidade;
    descricao.value = produto.descricao;
    produtoId.value = id;

    modal.show();
}

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
            const usuarioARemover = produtos.findIndex(produto => produto.id == id);
            produtos.splice(usuarioARemover, 1);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            location.reload();
        }
    });
}

const formularioCadastro = document.getElementById("cadastro");
formularioCadastro.addEventListener("submit", (event) => {
    event.preventDefault();
    const produto = document.getElementById("produto-nome").value;
    const quantidade = document.getElementById("produto-quantidade").value;
    const descricao = document.getElementById("produto-descricao").value;

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const ultimoID = produtos[produtos.length - 1]?.id || 0;
    const produtoAdd = {
        id: ultimoID + 1,
        nome: produto,
        quantidade: quantidade,
        descricao: descricao
    };

    produtos.push(produtoAdd);
    localStorage.setItem('produtos', JSON.stringify(produtos));
    location.reload();
});

const formularioEditar = document.getElementById("editar_modal");
formularioEditar.addEventListener("submit", (event) => {
    event.preventDefault();
    const produtoId = document.getElementById("produto-id-editar").value;
    const nome = document.getElementById("produto-nome-editar").value;
    const quantidade = document.getElementById("produto-quantidade-editar").value;
    const descricao = document.getElementById("produto-descricao-editar").value;
    
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    produtos = produtos.map(produto => produto.id == produtoId ? { ...produto, nome, quantidade, descricao } : produto);
    localStorage.setItem("produtos", JSON.stringify(produtos));
    location.reload();
});

function procurarProdutoById(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    const found = produtos.find((produto) => produto.id == id);
    return found;
}
