const btnAddProduct = document.querySelectorAll(".btnAddProduct");

btnAddProduct.forEach(btn => {
    btn.addEventListener("click", async (e) => {
        const pid = e.target.getAttribute("data-id");
        const result = await Swal.fire({
            title: 'Agregar al Carrito',
            input: 'text',
            text: 'Ingrese ID del carrito',
            inputValidator: (value) => {
                return !value && "Debe ingresar un ID valido!"
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        const access_token = localStorage.getItem("access_token");
        const cid = result.value;
        const url = `/api/cart/${cid}/${pid}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        });
        const resultJson = await response.json();
        if(response.status === 200){
            Swal.fire({
                icon: 'success',
                title: 'Agregado',
                text: 'El producto fue agregado al carrito exitosamente!'
            });
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: resultJson.error
            });
        }

    });
});