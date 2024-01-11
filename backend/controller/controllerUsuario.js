var usuarioDAO = require('../model/DAO/usuarioDAO.js')

var message = require('./modulo/config.js')

const getUsuarios = async function () {

    let dadosUsuarioJSON = {}

    let dadosUsuario = await usuarioDAO.selectUsuarios()

    if (dadosUsuario) {
        dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
        dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
        dadosUsuarioJSON.usuarios = dadosUsuario

        return dadosUsuarioJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}
const getUsuarioByEmail = async function(emailUsuario){

    let dadosUsuarioJSON = {}

    let dadosUsuario = await usuarioDAO.selectUsuarioByEmail(emailUsuario)

    if(dadosUsuario){
        dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
        dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
        dadosUsuarioJSON.usuario = dadosUsuario

        return dadosUsuarioJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
}
const getUsuarioById = async function (idUsuario) {

    let dadosUsuarioJSON = {}

    let dadosUsuario = await usuarioDAO.selectUsuarioById(idUsuario)

    if (dadosUsuario) {
        dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
        dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
        dadosUsuarioJSON.usuario = dadosUsuario

        return dadosUsuarioJSON[0]
    } else {
        return message.ERROR_NOT_FOUND
    }
}

const getUsuarioByLogin = async function (usuarioDados) {

    let dadosUsuarioJSON = {}

    let existingEmailOrUser = await usuarioDAO.selectUsuarioByEmailOrUser(usuarioDados)

    if (existingEmailOrUser) {
        let dadosUsuario = await usuarioDAO.selectUsuarioByLogin(usuarioDados)


        if (dadosUsuario) {

            if (dadosUsuario[0].ATIVO == 'S') {

                dadosUsuarioJSON.status = message.SUCCESS_REQUEST.status
                dadosUsuarioJSON.message = message.SUCCESS_REQUEST.message
                dadosUsuarioJSON.usuario = dadosUsuario

                return dadosUsuarioJSON
            } else {
                return message.ERROR_DISABLED_USER
            }


        } else {
            return message.ERROR_PASSWORD
        }

    } else {
        return message.ERROR_INVALID_EMAIL_OR_USER
    }

}

const insertUsuario = async function (dadosUsuario) {

    if (
        dadosUsuario.EMAIL == '' || dadosUsuario.EMAIL == undefined || dadosUsuario.EMAIL.length > 100 ||
        dadosUsuario.NOME == '' || dadosUsuario.NOME == undefined || dadosUsuario.NOME.length > 100 ||
        dadosUsuario.USUARIO == '' || dadosUsuario.USUARIO == undefined || dadosUsuario.USUARIO.length > 100 ||
        dadosUsuario.SENHA == '' || dadosUsuario.SENHA == undefined || dadosUsuario.SENHA.length > 100
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else {
        let emailOrUser = await usuarioDAO.emailOrUserAlreadyExists(dadosUsuario.EMAIL, dadosUsuario.USUARIO)
        console.log(emailOrUser);

        if (emailOrUser) {
            return message.ERROR_EXISTING_REGISTER
        } else {
            let resultadoUsuario = await usuarioDAO.insertUsuario(dadosUsuario)

            if (resultadoUsuario) {

                let novoUsuario = await usuarioDAO.selectLastId()

                let dadosUsuarioJSON = {}

                dadosUsuarioJSON.status = message.SUCCESS_CREATE_ITEM.status
                dadosUsuarioJSON.message = message.SUCCESS_CREATE_ITEM.message
                dadosUsuarioJSON.usuario = novoUsuario[0]

                return dadosUsuarioJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

const updateUsuario = async function (dadosUsuario, idUsuario) {

    if (
        dadosUsuario.EMAIL == '' || dadosUsuario.EMAIL == undefined || dadosUsuario.EMAIL.length > 100 ||
        dadosUsuario.NOME == '' || dadosUsuario.NOME == undefined || dadosUsuario.NOME.length > 100 ||
        dadosUsuario.USUARIO == '' || dadosUsuario.USUARIO == undefined || dadosUsuario.USUARIO.length > 100 ||
        dadosUsuario.SENHA == '' || dadosUsuario.SENHA == undefined || dadosUsuario.SENHA.length > 100
    ) {
        return message.ERROR_REQUIRED_FIELDS
    } else if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {

        return message.ERROR_INVALID_ID
    } else {

        dadosUsuario.ID = idUsuario

        const existingData = await usuarioDAO.selectUsuarioById(idUsuario);
        if (
            existingData.EMAIL === dadosUsuario.EMAIL &&
            existingData.NOME === dadosUsuario.NOME &&
            existingData.USUARIO === dadosUsuario.USUARIO &&
            existingData.ATIVO === dadosUsuario.ATIVO &&
            existingData.SENHA === dadosUsuario.SENHA
        ) {
            return message.ERROR_NO_CHANGES;
        }

        else {

            let emailExistente = await usuarioDAO.emailAlreadyExists(dadosUsuario.EMAIL, idUsuario)
            let usuarioExistente = await usuarioDAO.usuarioAlreadyExists(dadosUsuario.USUARIO, idUsuario)
            if(emailExistente || usuarioExistente){
                return message.ERROR_EXISTING_EMAIL_OR_USER
            } 
             else {
                
            let resultadoUsuario = await usuarioDAO.updateUsuario(dadosUsuario)

            if (resultadoUsuario) {

                let dadosUsuarioJSON = {}

                dadosUsuarioJSON.status = message.SUCCESS_UPDATE_ITEM.status
                dadosUsuarioJSON.message = message.SUCCESS_UPDATE_ITEM.message
                dadosUsuarioJSON.usuario = dadosUsuario

                return dadosUsuarioJSON
            } else {
                return message.ERROR_INTERNAL_SERVER
            }
            }


 


        }


    }
}




module.exports = {
    getUsuarios,
    getUsuarioByLogin,
    insertUsuario,
    updateUsuario,
    getUsuarioById,
    getUsuarioByEmail
}