const ticketModel = require('../model/ticket.model');

const getTickets = async () => {
    try {

        const tickets = ticketModel.find();
        return tickets;

    } catch (error) {
        console.error(error)
        throw new Error("Lấy dữ liệu không thành công");
    }
}

module.exports = { getTickets }