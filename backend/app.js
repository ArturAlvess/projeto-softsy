// Import das dependências
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Instanciando o app

const app = express()

//define as permissões do cors
app.use((request, response, next) => {

    //defini quem poderá acessar a  API
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //atribui as permissões as cors
    app.use(cors())

    next()

})
//Define que os dados que irao chegar na requisição será no padrão JSON
const bodyParserJSON = bodyParser.json()

//imports
var message = require('./controller/modulo/config.js')
var controllerUsuario = require('./controller/controllerUsuario.js')


///////// Endpoints Usuário //////////

// retorna os usuários
app.get('/softsy/usuario', cors(), async function (request, response) {

    let dadosUsuario = await controllerUsuario.getUsuarios()

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

// retorna um usuário pelo email
app.get('/softsy/usuario/email/:email', cors(), async function(request, response){

    let emailUsuario = request.params.email

    let dadosUsuario = await controllerUsuario.getUsuarioByEmail(emailUsuario)

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

// autentica o usuário
app.post('/softsy/login', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let body = request.body

        let dadosUsuario = await controllerUsuario.getUsuarioByLogin(body)

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

// insere um usuário
app.post('/softsy/usuario', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let body = request.body

        let dadosUsuario = await controllerUsuario.insertUsuario(body)

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

// atualiza um usuário
app.put('/softsy/usuario/id/:id', cors(), bodyParserJSON, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {

        //Recebe os dados encaminhados na requisição
        let body = request.body

        let idUsuario = request.params.id



        let resultadoUsuario = await controllerUsuario.updateUsuario(body, idUsuario)

        response.status(resultadoUsuario.status)
        response.json(resultadoUsuario)



    } else {

        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})







app.listen(8080, function () {
    console.log('Aguardando requisições na porta 8080')
})
