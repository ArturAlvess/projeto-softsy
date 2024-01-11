// Import da biblioteca do cliente do prisma
var { PrismaClient } = require('@prisma/client')

// Criando instância do prisma
var prisma = new PrismaClient()


// Retorna todos os usuários
const selectUsuarios = async function(){

    let sql = `select * from USUARIOS order by ID desc`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return resultadoUsuario
    else
        return false
}

// Retorna um usuário pelo ID
const selectUsuarioById = async function(idUsuario){

    let sql = `select * from USUARIOS where ID = ${idUsuario}`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return resultadoUsuario[0]
    else
        return false
}

const selectUsuarioByEmailOrUser = async function(dadosUsuario){

    let sql = `select * from USUARIOS where EMAIL = '${dadosUsuario.AUTH}' OR USUARIO = '${dadosUsuario.AUTH}'`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return true
    else
        return false
        
}

// Autentica um usuário
const selectUsuarioByLogin = async function(dadosUsuario){

    let sql = `select * from USUARIOS where SENHA = '${dadosUsuario.SENHA}' AND (EMAIL = '${dadosUsuario.AUTH}' OR USUARIO = '${dadosUsuario.AUTH}') `

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return resultadoUsuario
    else
        return false
        
}

// Verifica se o email ou usuário já existe
const emailOrUserAlreadyExists = async function(email, usuario){

    let sql = `select * from USUARIOS where EMAIL = '${email}' OR USUARIO = '${usuario}'`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return true
    else
        return false
}

const emailAlreadyExists = async function(email, id){

    let sql = `select * from USUARIOS where id <> ${id} AND EMAIL = '${email}'`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return true
    else
        return false
}

const usuarioAlreadyExists = async function(usuario, id){

    let sql = `select * from USUARIOS where id <> ${id} AND USUARIO = '${usuario}'`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0)
        return true
    else
        return false
}


// Retorna um usuário pelo email
const selectUsuarioByEmail = async function (email){

    let sql = `select * from USUARIOS where EMAIL = '${email}'`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0){
        return resultadoUsuario
    } else {
        return false
    }
}

// Atualiza um usuário
const updateUsuario = async function(dadosUsuario){

        let sql = ` update USUARIOS set
                NOME = '${dadosUsuario.NOME}',
                USUARIO = '${dadosUsuario.USUARIO}',
                SENHA = '${dadosUsuario.SENHA}',
                ATIVO = '${dadosUsuario.ATIVO}',
                EMAIL = '${dadosUsuario.EMAIL}'
                
                where ID = ${dadosUsuario.ID}`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if (resultadoUsuario)
        return true
    else
        return false

}

// Deleta um usuário
const deleteUsuario = async function(idUsuario){

    let sql = `delete from USUARIOS where ID = ${idUsuario}`

    let resultadoUsuario = await prisma.$executeRawUnsafe(sql)

    if(resultadoUsuario)
        return true
    else
        return false
}

// Insere um novo aluno
const insertUsuario = async function (dadosUsuario){
    let sql = `insert into USUARIOS (
        NOME,
        USUARIO,
        SENHA,
        ATIVO,
        EMAIL
    ) values (
        '${dadosUsuario.NOME}',
        '${dadosUsuario.USUARIO}',
        '${dadosUsuario.SENHA}',
        'S',
        '${dadosUsuario.EMAIL}'
    );`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario)
        return true
    else
        return false
}


// Função suporte
const selectLastId = async function(){
    let sql = `select * from USUARIOS order by ID desc limit 1;`

    let resultadoUsuario = await prisma.$queryRawUnsafe(sql)

    if(resultadoUsuario.length > 0){
        return resultadoUsuario
    } else
        return false

}

module.exports = {
    selectUsuarioByLogin,
    selectUsuarios,
    updateUsuario,
    deleteUsuario,
    insertUsuario,
    selectUsuarioByEmailOrUser,
    emailOrUserAlreadyExists,
    selectLastId,
    selectUsuarioById,
    emailAlreadyExists,
    usuarioAlreadyExists,
    selectUsuarioByEmail
}
