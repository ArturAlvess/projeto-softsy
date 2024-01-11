'use strict'

export const getAllUsuarios = async () => {
    const url = 'http://localhost:8080/softsy/usuario'
    const response = await fetch(url)
    const data = response.json()

    return data
}

export const getUsuarioByEmail = async (emailUsuario) => {
    const url = `http://localhost:8080/softsy/usuario/email/${emailUsuario}`
    const response = await fetch(url)
    const data = response.json()    

    return data
}

export const createUser = async (dadosUsuario) => {
    const url = "http://localhost:8080/softsy/usuario"
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dadosUsuario),
    };

    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Usuário criado com sucesso!",
                    showConfirmButton: false
                });
                return response.json();
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (data.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Usuário criado com sucesso!",
                    showConfirmButton: false
                });
            } else if (data.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: "Já existe um registro com os dados informados.",
                    showConfirmButton: false
                });
            }
        })
        .catch((error) => {
            return error
        });
}

export const updateUser = async (dadosUsuario, id) => {
    const url = `http://localhost:8080/softsy/usuario/id/${id}`
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(dadosUsuario)
    };

    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Usuário atualizado com sucesso!",
                    showConfirmButton: false
                });
                return response.json();
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (data.status == 200) {
                Swal.fire({
                    icon: "success",
                    title: "Usuário atualizado com sucesso!",
                    showConfirmButton: false
                });
            }
            else if (data.status == 500) {
                Swal.fire({
                    icon: "error",
                    title: "O usuário ou email já existe.",
                    showConfirmButton: false
                });

            }
            else if (data.status == 400) {
                Swal.fire({
                    icon: "error",
                    title: data.message,
                    showConfirmButton: false
                });

            } 
            
        })
        .catch((error) => {
            return error
        });

}

export const authUser = async (userLogin) => {
    const url = 'http://localhost:8080/softsy/login'
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userLogin)
    };

    fetch(url, options)
        .then((response) => {
            if (response.ok) {
                window.location.href = './pages/home.html'
                return response.json();
            } else {
                return response.json()
            }
        })
        .then((data) => {
            if(data.status == 400){
                Swal.fire({
                    icon: "error",
                    title: data.message,
                    showConfirmButton: false
                });
            } else if (data.status == 403){
                Swal.fire({
                    icon: "error",
                    title: data.message,
                    showConfirmButton: false
                });
            }
            
        })
        .catch((error) => {
            return error
        })
}
