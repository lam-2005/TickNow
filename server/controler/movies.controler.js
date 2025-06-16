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

const getMovieStatus = async (status) => {
    try{

        if(!status){
            throw new Error("❌ Trạng thái phim không hợp lệ");
        }

        const movie = await movieModel.find({status})
        
        return movie
    }catch(error){
        console.error(error.message)
        throw new Error('❌ Lỗi lấy dữ liệu của movie')
    }
}

module.exports = { getMovies, getMovieStatus };
