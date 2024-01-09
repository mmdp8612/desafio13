import { v4 as uuidv4 } from 'uuid';
import Ticket from './models/Ticket.js';

export class TicketMongo {

    constructor(){

    }

    async getTickets(){
        try {
            return await Ticket.find();
        } catch (error) {
            throw new Error(error);
        }
    }

    async createTicket({totalPurchase, email}){
        try {
            const newTicket = new Ticket({
                code: uuidv4(),
                purchase_datetime: Date.now(),
                amount: totalPurchase,
                purchaser: email
            });
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error(error);
        }   
    }
}