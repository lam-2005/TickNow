const movieModel = require('../model/movies.model');

const getMovies = async () => {
    try{
        const movies = await movieModel.find();
        return movies;
    }catch(error){
        console.error(error.message)
        throw new Error('❌ Lỗi lấy dữ liệu của movie')
    }
    
}

module.exports = { getMovies };
