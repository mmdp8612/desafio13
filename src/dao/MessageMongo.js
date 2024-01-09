import Message from "./models/Message.js";

export class MessageMongo {
    
    constructor(){

    }

    async getMessages(){
        try {
            return await Message.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    async addMessage(messages){
        try {
            const { fechahora, transmitter, message } = messages;
            const newMessage = new Message({fechahora: fechahora, nickname: transmitter, message: message});
            await newMessage.save();
        } catch (error) {
            throw new Error(error);
        }
        
    }
}