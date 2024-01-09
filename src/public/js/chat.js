let nickname = null;
const chatMessages = document.querySelector("#messages");
const chatInputMessage = document.querySelector("#chatInputMessage");

chatInputMessage.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        if(e.target.value.trim() !== ""){
            const date = new Date();
            const datetime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            socket.emit("newMessage", {
                fechahora: datetime,
                transmitter: nickname,
                message: e.target.value.trim()
            });
            e.target.value = "";
            chatInputMessage.focus();
        }
    }    
});

const iniciarChat = async () => {
    const result = await Swal.fire({
        title: 'Bienvenido',
        input: 'text',
        text: 'Ingrese un nickname',
        inputValidator: (value) => {
            return !value && "Debe ingresar un nickname!"
        },
        allowOutsideClick: () => !Swal.isLoading()
    });    
    
    nickname = result.value;

    document.querySelector("#txtNickname").innerHTML = `Chat - ${nickname}`;

    socket.emit('nickname', nickname);

    socket.on('chatWelcome', message => {
        chatMessages.innerHTML = `<div><p>(${message.fechahora}) >>> <b>${message.transmitter}:</b> ${message.message}</p></div>`;
        message.listMessages.forEach(message => {
            const className = message.transmitter === message.nickname ? "me" : "other";
            chatMessages.innerHTML += `<div>
                    <p class="${className}">
                        (${message.fechahora}) 
                        >>> <b>${message.nickname}:</b> ${message.message}
                    </p>
                </div>`;    
        });
    });

    socket.on('messageReceived', message => {
        const className = message.transmitter === nickname ? "me" : "other";
        chatMessages.innerHTML += `<div><p class="${className}">(${message.fechahora}) >>> <b>${message.transmitter}:</b> ${message.message}</p></div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

}

iniciarChat();

