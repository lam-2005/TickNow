const roomModel = require('../model/room.model');

const getRooms = async () => {
    try {

        const rooms = await roomModel.find();
        return rooms;

    } catch (error) {

        console.error(error);
        throw new Error('Lấy dữ liệu không thành công', error.message);

    }
}

module.exports = { getRooms };