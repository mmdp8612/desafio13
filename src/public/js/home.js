//const socket = io();

const tblProducts = document.querySelector("#tblProducts tbody");
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
            </tr>
        `;
    });
}

socket.on("updateProducts", products => {
    console.log("Updated Product!");
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
            </tr>
        `;
    });
});

getProducts();