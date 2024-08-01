import MongoDao from "./mongo.dao.js";
import { TicketModel } from "./models/ticketModel.js";

export default class TicketDaoMongo extends MongoDao {
    constructor() {
        super(TicketModel);
    }
};