const emailInput = document.getElementById("email")
const senhaInput = document.getElementById("senha")
const formulario = document.getElementById("form_id")

formulario.addEventListener("submit", (event) => {
    event.preventDefault()
    const emailDigitado = emailInput.value
    const senhaDigitada = senhaInput.value
    const user = procuraUsuario(emailDigitado, senhaDigitada)

    if (user) {
        Swal.fire({
            icon: "success",
            title: "Você entrou no sistema",
            showConfirmButton: false,
            timer: 1500
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Email ou Senha errados!",
            showConfirmButton: false,
            timer: 1500
          });
    }
})

function procuraUsuario (emailDigitado, senhaDigitada) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const found = usuarios.find((usuario) => {
        return (
            usuario.email == emailDigitado && 
            usuario.senha == senhaDigitada
        )
    })
    return found
}