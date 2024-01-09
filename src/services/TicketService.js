import { DaoTicket as DAO } from "../dao/factory.js";

class TicketService {
    constructor(dao){
        this.dao = new dao();
    }

    async getTickets(){
        return await this.dao.getTickets(paginate, search);        
    }

    async createTicket(data){
        return await this.dao.createTicket(data);
    }

}

export const ticketService = new TicketService(DAO);