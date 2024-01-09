const btnFinalizePurchase = document.querySelector(".btnFinalizePurchase");

btnFinalizePurchase.addEventListener("click", async (e) => {
    const access_token = localStorage.getItem("access_token");
    const cid = document.querySelector("#cid").value;
    const url = `/api/cart/${cid}/purchase`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    });

    const result = await response.json();

    if(response.status === 200){
        Swal.fire({
            icon: 'success',
            title: 'Detalle del Ticket',
            text: `Se ha generado el tiket de su compra por un total de $ ${result.amount}.`
        }).then(() => {
            location.href = `/view/cart/${cid}`;
        });        
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: result.message
        });
    }
});