const userModel = require('../model/users.model');

const getUsers = async () => {
    try {

        const users = userModel.find();
        return users;

    } catch (error) {
        console.error(error)
        throw new Error("Lấy dữ liệu không thành công");
    }
}

module.exports = { getUsers }