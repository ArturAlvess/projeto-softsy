/********************* MENSAGENS DE SUCESSO ********************/
const SUCCESS_CREATE_ITEM   = {status:201, message: 'Item criado com sucesso.'}

const SUCCESS_UPDATE_ITEM   = {status:200, message: 'Item atualizado com sucesso.'}

const SUCCESS_DELETE_ITEM   = {status:200, message: 'Item apagado com sucesso.'}

const SUCCESS_REQUEST       = {status:200, message: 'Requisição bem sucedida.'}

/********************* MENSAGENS DE ERRO ********************/
const ERROR_REQUIRED_FIELDS = {
    status: 400,
    message: "Campos obrigatórios não foram preenchidos.",
  };

  const ERROR_NO_CHANGES = {
    status: 400,
    message: "Não foi constada nenhuma mudança.",
  };
  
  const ERROR_INVALID_ID = {
    status: 400,
    message: "O ID informado na requisição não é válido ou não foi encaminhado.",
  };

  const ERROR_EXISTING_REGISTER = {
    status: 400,
    message:
      "Já existe um registro com os dados informados.",
  };

  const ERROR_EXISTING_EMAIL_OR_USER = {
    status: 400,
    message:
      "O email ou usuário já existem no sistema.",
  };
  const ERROR_EXISTING_USER = {
    status: 400,
    message:
      "Já existe um usuário idêntico.",
  };

  const ERROR_INVALID_EMAIL_OR_USER = {
    status: 400,
    message:
      "O email ou o usuário informado na requisição não é válido ou não foi encaminhado.",
  };

  const ERROR_PASSWORD = {
    status: 400,
    message:
      "A senha informada não é correta.",
  };
  
  const ERROR_ID_NOT_FOUND = {
    status: 404,
    message: "O ID informado é válido, mas não existe.",
  };

  const ERROR_NOT_FOUND = {
    status: 404,
    message: "Nenhum item encontrado na requisição.",
  };
  
  const ERROR_INTERNAL_SERVER = {
    status: 500,
    message:
      "Devido a um erro interno no servidor, não foi possível processar a requisição.",
  };

  const ERROR_DISABLED_USER = {
    status: 403,
    message: "Este usuário está desativado.",
  };

  const ERROR_INVALID_CONTENT_TYPE = {
    status: 415,
    message:
      "O tipo de mídia Content-type da solicitação não é compatível com o servidor. Tipo aceito:[application/json]",
  };

  module.exports = {
    ERROR_EXISTING_REGISTER,
    ERROR_ID_NOT_FOUND,
    ERROR_INTERNAL_SERVER,
    ERROR_NOT_FOUND,
    ERROR_INVALID_ID,
    ERROR_REQUIRED_FIELDS,
    SUCCESS_CREATE_ITEM,
    SUCCESS_DELETE_ITEM,
    SUCCESS_REQUEST,
    SUCCESS_UPDATE_ITEM,
    ERROR_DISABLED_USER,
    ERROR_PASSWORD,
    ERROR_INVALID_EMAIL_OR_USER,
    ERROR_INVALID_CONTENT_TYPE,
    ERROR_NO_CHANGES,
    ERROR_EXISTING_EMAIL_OR_USER,
    ERROR_EXISTING_USER
  }