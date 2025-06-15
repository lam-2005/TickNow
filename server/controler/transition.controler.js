const transitionModel = require('../model/transition.model');

const getTransition = async () => {
    try {

        const transitions = transitionModel.find();
        return transitions;

    } catch (error) {
        console.error(error)
        throw new Error("Lấy dữ liệu không thành công");
    }
}

module.exports = { getTransition }