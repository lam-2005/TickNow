const cinemaModel = require('../model/cinemas.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getCinema = async () => {
    try{
        
        const products =  await cinemaModel.find();
        return products;

    }catch(error){
        console.error(error.message)
        throw new Error("❌ Lỗi lấy dữ liệu của cinema")
    }
}

const getCinemaLocation = async (locationId) => {
    try{
        const cinemaLocation = await cinemaModel.find({'location.id_location': new ObjectId(locationId) });
        return cinemaLocation;
    }catch(error){
        console.error(error);
        throw new Error("❌ Lỗi lấy dữ liệu theo địa chỉ cinema");
    }
} 

module.exports = { getCinema, getCinemaLocation }