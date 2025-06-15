const rateModel = require('../model/rates.model');

const getRate = async () => {
    try {
        const rates = await rateModel.find()
        return rates;
    } catch (error) {
        console.error(error);
        throw new Error('Lấy dữ liệu không thành công');
    }
}

module.exports = { getRate }