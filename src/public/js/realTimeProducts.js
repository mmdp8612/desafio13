//const socket = io();

const tblProducts = document.querySelector("#tblProducts tbody");
const formProduct = document.querySelector("#formProduct");

formProduct.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formProduct);
    const formDataJSON = {};
    formData.forEach((valor, clave) => {
      formDataJSON[clave] = valor;
    });
    formProduct.reset();
    socket.emit("newProduct", formDataJSON);
});

const getProducts = async () => {
    const url = "/api/products";
    const response = await fetch(url);
    const products = await response.json();
    tblProducts.innerHTML = "";
    products.data.map((product) => {
        const img = product.thumbnail?product.thumbnail:"";
        tblProducts.innerHTML += `
            <tr>
                <td class="text-center">
                    <img src="${img}" width="90" />
                </td>
                <td class="text-center">${product.code}</td>
                <td class="text-left">${product.title}</td>
                <td class="text-center">${product.price}</td>
                <td class="text-center">${product.stock}</td>
                <td class="text-center">
                    <button type="button" class="btn btEliminar" onclick="removeProduct('${product.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

socket.on("updateProducts", products => {
    tblProducts.innerHTML = "";
    products.map((product) => {
        const img = product.thumbnail?product.thumbnail:"";
        tblProducts.innerHTML += `
            <tr>
                <td class="text-center">
                    <img src="${img}" width="90" />
                </td>
                <td class="text-center">${product.code}</td>
                <td class="text-left">${product.title}</td>
                <td class="text-center">${product.price}</td>
                <td class="text-center">${product.stock}</td>
                <td class="text-center">
                    <button type="button" class="btn btEliminar" onclick="removeProduct('${product.id}')">Eliminar</button>
                </td>
            </tr>
        `;
    });
});

function removeProduct(id){
    if(confirm("Seguro que quiere eliminar este producto?")){
        socket.emit("removeProduct", id);
    }
}

getProducts();

