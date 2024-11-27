const tabela = document.getElementById("tabela_produtos")
const produtos = JSON.parse(localStorage.getItem("produtos"))

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
                <div class="btn btn-warning" onClick="editarprodutos(${produto.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarprodutos(${produto.id})">Apagar</div>
            </td>
        </tr>
    `
    tabela.innerHTML += linha
}

function editarproduto(id) {
    const produtos = procurarprodutosById(id)
    // abrir modal do id modal_cadastro
    var modal = new bootstrap.Modal(document.getElementById('modal_edicao'));
    const produtoseditar = document.getElementById("produtos-editar")
    const nomeeditar = document.getElementById("produto-editar")
    const descricaoeditar = document.getElementById("descricao-editar-2")

    produtoseditar.value = produtos.produtos
    nomeeditar.value = produtos.produto
    descricaoeditar.value = produtos.produto

    modal.show(); // 
}

function apagarprodutos(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá desfazer está ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            const usuarioAremover = produtos.findIndex(produtos => produtos.id == id)
            produtos.splice(usuarioAremover, 1)
            localStorage.setItem('produtos', JSON.stringify(produtos))
            location.reload()
        }
      });
}

const formulario_cadastro = document.getElementById("cadastro")

formulario_cadastro.addEventListener("submit", (event) => {
    event.preventDefault()
    const produto = document.getElementById("produto-nome").value
    const quantidade = document.getElementById("produto-quantidade").value 
    const descricao = document.getElementById("produto-descricao").value

    let produtos = JSON.parse(localStorage.getItem("produtos"))
    const ultimoID = produtos[produtos.length -1]?.id || 0
    const produtoAdd = {
        id: ultimoID + 1,
        nome: produto,
        quantidade: quantidade,
        descricao: descricao
    }
    
    produtos.push(produtoAdd)
    localStorage.setItem('produtos', JSON.stringify(produtos))
    location.reload()
})

function procuraUsuarioByprodutos (produtosDigitado) {
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    const found = produtos.find((produtos) => {
        return produtos.produtos == produtosDigitado 
    })
    return found
}

function procurarprodutosById(id) {
    const produtos = JSON.parse(localStorage.getItem("produtos"))
    const found = produtos.find((produtos) => {
        return produtos.id == id 
    })
    return found
}