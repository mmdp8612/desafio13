import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

class MessageManager {

    constructor(){
        const __filename = fileURLToPath(import.meta.url);
        this.path = path.join(path.dirname(__filename), '../data/messages.json');
        this.loadMessages();
    }

    async loadMessages(){
        try {
            this.messages = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
        } catch (error) {
            this.messages = [];
        }
    }

    async getMessages(){
        
    }

    async addMessage(messages){
        
    }
}

export default MessageManager;