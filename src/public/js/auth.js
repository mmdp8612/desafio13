const formOlvido = document.querySelector("#formOlvido")?document.querySelector("#formOlvido"):null;
const formRecupera = document.querySelector("#formRecuperar")?document.querySelector("#formRecuperar"):null;
const formRegister = document.querySelector("#formRegister")?document.querySelector("#formRegister"):null;
const formLogin = document.querySelector("#formLogin")?document.querySelector("#formLogin"):null;

formRecupera?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = `/api/auth/recuperar`;
    const formData = new FormData(e.target);
    const formDataJSON = {};

    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    });

    const result = await response.json();

    if(result.success){
        Swal.fire({
            icon: 'success',
            title: 'Actualizacion',
            text: result.message
        }).then(() => {
            location.href = "/view/login";
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.message
        });
    }    
});

formOlvido?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = `/api/auth/olvido`;
    const formData = new FormData(e.target);
    const formDataJSON = {};

    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    });

    const result = await response.json();

    formOlvido.reset();

    if(result.success){
        Swal.fire({
            icon: 'success',
            title: result.message,
            text: `Se envio un email a ${e.target.email.value} con un link para crear una nueva clave!`
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: result.message,
            text: `Vuelva a intentarlo mas tarde!`
        });
    }
});

formLogin?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const url = `/api/auth/login`;
    const formData = new FormData(e.target);
    const formDataJSON = {};
    
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    });

    const result = await response.json();

    if(result.success){

        localStorage.setItem("access_token", result.token);
        localStorage.setItem("uid", result.user._id);

        Swal.fire({
            icon: 'success',
            title: 'Usuario logueado con exito!',
            text: result.message
        }).then(() => {
            location.href = "/view/products";
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: result.message,
            text: result.error
        });
    }
});

formRegister?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = `/api/auth/register`;
    const formData = new FormData(e.target);
    const formDataJSON = {};
    
    formData.forEach((value, key) => {
        formDataJSON[key] = value;
    });

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJSON)
    });

    const result = await response.json();

    if(result.success){
        Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: result.message
        }).then(() => {
            location.href = "/view/login";
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: result.message,
            text: result.error
        });
    }
});