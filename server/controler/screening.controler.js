const screeningModel = require('../model/screening.model');

const getScreeings = async () => {
    try {

        const screenings = screeningModel.find();
        return screenings;

    } catch (error) {
        console.error(error)
        throw new Error("Lấy dữ liệu không thành công");
    }
}

module.exports = { getScreeings }