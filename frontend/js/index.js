'use strict'

import { getAllUsuarios, authUser, createUser, updateUser, getUsuarioByEmail } from "./main.js"

const usuarios = await getAllUsuarios()


const logarUsuario = async () => {

    const buttonLogin = document.getElementById("buttonLogar")

    buttonLogin.addEventListener('click', async () =>{

        const emailOrUser = document.getElementById("input-emailUser").value
        const senha = document.getElementById("input-senha").value

        console.log(senha);

        if(emailOrUser == '' || senha == ''){
            Swal.fire({
                title: "Informação",
                text: "Campos obrigatórios não foram preenchidos.",
                icon: "info"
            });
        } else {
            
            const dadosJSON = {
                AUTH: emailOrUser,
                SENHA: senha
            }
            const usuarioLogado = await authUser(dadosJSON)
            console.log(usuarioLogado);

        }

    })
}
logarUsuario()

const criarUsuarios = async () => {

    const buttonCadastrar = document.getElementById("buttonCadastrar")
    buttonCadastrar.addEventListener('click', async () => {

        const inputNome = document.getElementById("nome")
        const inputUsuario = document.getElementById("usuario")
        const inputEmail = document.getElementById("email")
        const inputSenha = document.getElementById("senha")

        if(
            inputNome.value == '' || inputNome.value == null ||
            inputEmail.value == '' || inputEmail.value == null ||
            inputUsuario.value == '' || inputUsuario.value == null ||
            inputSenha.value == '' || inputSenha.value == null
        ) {
            Swal.fire({
                title: "Informação",
                text: "Campos obrigatórios não foram preenchidos.",
                icon: "info"
            });
        } else {

            const dadosJSON = {
                NOME: inputNome.value,
                USUARIO: inputUsuario.value,
                SENHA: inputSenha.value,
                EMAIL: inputEmail.value
            }

            const createdUser = await createUser(dadosJSON)

            console.log(createdUser);

            setTimeout(function () {
                location.reload()
            },3500)
        }

    })
}
const esqueciSenha = async () => {
    console.log('dahsod');
    const buttonConfirmar = document.getElementById("buttonConfirmar")
    buttonConfirmar.addEventListener('click', async () => {

        const inputEmail = document.getElementById("email-esqueci-senha")

        if(inputEmail.value == '' || inputEmail.value == undefined){
            Swal.fire({
                title: "Informação",
                text: "Campos obrigatórios não foram preenchidos.",
                icon: "info"
            });
        } else {


            const trocarSenha = await getUsuarioByEmail(inputEmail.value)
            if(trocarSenha.status == 200){
                Swal.fire({
                    title: "Informação",
                    text: "Você receberá as informações para troca de senha dentro de 1 hora.",
                    icon: "info"
                });
            } else if(trocarSenha.status == 404){
                Swal.fire({
                    title: "Erro",
                    text: "O email informado não existe em nossa base de dados.",
                    icon: "error"
                });
            }

            // setTimeout(function () {
            //     location.reload()
            // },4000)
        }
    })
}
esqueciSenha()
const criarCardsUsuarios = (usuario) => {

    const cardUsuarios = document.createElement('card-usuario')
    cardUsuarios.classList.add('card-usuario')

    const nomeUsuario = document.createElement('div')
    nomeUsuario.textContent = usuario.NOME

    const iconEdit = document.createElement('i');
    iconEdit.classList.add('fa-solid', 'fa-pen-to-square');
    iconEdit.setAttribute("data-bs-toggle", "modal")
    iconEdit.setAttribute("data-bs-target", "#buttonEdit")
    iconEdit.addEventListener('click', ()=>{

        const nameUsuario = document.getElementById("nomeEditar")
        const userUsuario = document.getElementById("usuarioEditar")
        const emailUsuario = document.getElementById("emailEditar")
        const senhaUsuario = document.getElementById("senhaEditar")
        const checkboxAtivo = document.getElementById("ativo")
        const checkboxDesativado = document.getElementById("desativado")
        let ativoUsuario = usuario.ATIVO


        nameUsuario.value = usuario.NOME
        userUsuario.value = usuario.USUARIO
        emailUsuario.value = usuario.EMAIL
        senhaUsuario.value = usuario.SENHA

        if(usuario.ATIVO == 'S'){
            checkboxAtivo.checked = true
            checkboxDesativado.checked = false
        } 
        else{
            checkboxDesativado.checked = true
            checkboxAtivo.checked = false
        }

        checkboxAtivo.addEventListener('click', ()=>{
            if(checkboxAtivo.checked == true){
                checkboxDesativado.checked = false
            } else {
                checkboxDesativado.checked = true
                checkboxAtivo.checked = false
            }
        })

        checkboxDesativado.addEventListener('click', ()=>{
            if(checkboxAtivo.checked == true){
                checkboxAtivo.checked = false
                checkboxDesativado.checked = true
            } else {
                checkboxAtivo.checked = true
                checkboxDesativado.checked = false
            }
        })

       

        const buttonSalvar = document.getElementById("buttonSalvar")
        buttonSalvar.addEventListener('click', () =>{

            if(checkboxAtivo.checked){
                ativoUsuario = 'S'
            } else {
                ativoUsuario = 'N'
            }

            const dadosJSON = {
                NOME: nameUsuario.value,
                USUARIO: userUsuario.value,
                SENHA: senhaUsuario.value,
                ATIVO: ativoUsuario,
                EMAIL: emailUsuario.value
            }

            updateUser(dadosJSON, usuario.ID)

            setTimeout(function () {
                location.reload()
            },4500)


        })
    })


    const statusUsuario = document.createElement('div')
    statusUsuario.textContent = usuario.ATIVO
    

    if (usuario.ATIVO == 'S') {
        statusUsuario.textContent = 'Ativo'
    } else {
        statusUsuario.textContent = 'Desativado'
    } 

    if(usuario.ATIVO == 'S'){
        statusUsuario.classList.add("status-usuario-ativo")
    }
    else{
        statusUsuario.classList.add("status-usuario-desativado")
    }


    cardUsuarios.append(nomeUsuario, iconEdit, statusUsuario)
    return cardUsuarios

}

const carregarCards = () => {
    const container = document.querySelector('.container-usuarios')


    const cards = usuarios.usuarios.map(criarCardsUsuarios)
    usuarios.usuarios.forEach(user => {
        console.log(user);
    })
    // console.log(cards);

    container.replaceChildren(...cards)
    console.log(cards);
}


carregarCards()
criarUsuarios()



