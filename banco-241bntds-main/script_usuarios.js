const tabela = document.getElementById("tabela_usuarios")
const usuarios = JSON.parse(localStorage.getItem("usuarios"))

if (!usuarios) {
    localStorage.setItem("usuarios", JSON.stringify([]))
    location.reload()
}

for (let index = 0; index < usuarios.length; index++) {
    const usuario = usuarios[index];
    const linha = `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.email}</td>
            <td>${usuario.senha}</td>
            <td class="text-center">
                <div class="btn btn-warning" onClick="editarUsuario(${usuario.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarUsuario(${usuario.id})">Apagar</div>
            </td>
        </tr>
    `
    tabela.innerHTML += linha
}

function editarUsuario(id) {
    const usuario = procuraUsuarioById(id)
    // abrir modal do id modal_cadastro
    var modal = new bootstrap.Modal(document.getElementById('modal_edicao'));
    const emaileditar = document.getElementById("email-editar")
    const senhaeditar = document.getElementById("senha-editar")
    const senha2editar = document.getElementById("senha-editar-2")

    emaileditar.value = usuario.email
    senhaeditar.value = usuario.senha
    senha2editar.value = usuario.senha

    modal.show(); // 
}

function apagarUsuario(id) {
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
            const usuarioAremover = usuarios.findIndex(usuario => usuario.id == id)
            usuarios.splice(usuarioAremover, 1)
            localStorage.setItem('usuarios', JSON.stringify(usuarios))
            location.reload()
        }
      });
}

const formulario_cadastro = document.getElementById("cadastro")

formulario_cadastro.addEventListener("submit", (event) => {
    event.preventDefault()
    const senhaDigitada = document.getElementById("senha-cadastro").value
    const confirmacaoSenha = document.getElementById("senha-cadastro-2").value 
    const emailDigitado = document.getElementById("email-cadastro").value

    console.log(senhaDigitada, confirmacaoSenha, emailDigitado)

    if (senhaDigitada != confirmacaoSenha) {
        // Alerta de erro
        Swal.fire("As senhas devem ser iguais");
        // Quebrar a função
        return
    }

    const hasEmailCadastrado = procuraUsuarioByEmail(emailDigitado)
    if (hasEmailCadastrado) {
        // alerta erro
        Swal.fire("Já existe esse email no nosso banco de dados");
        // Quebra funçao
        return
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const ultimoID = usuarios[usuarios.length -1]?.id || 0
    const usuarioAdd = {
        id: ultimoID + 1,
        email: emailDigitado,
        senha: senhaDigitada
    }
    
    usuarios.push(usuarioAdd)
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    location.reload()
})

function procuraUsuarioByEmail (emailDigitado) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const found = usuarios.find((usuario) => {
        return usuario.email == emailDigitado 
    })
    return found
}

function procuraUsuarioById(id) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const found = usuarios.find((usuario) => {
        return usuario.id == id 
    })
    return found
}
