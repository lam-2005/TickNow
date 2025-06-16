const movieModel = require('../model/movies.model');
const mapGenre = require('../utils/mapGenreMovie');

const getMovies = async () => {
    try{

        const movies = await movieModel.find();
        const result = mapGenre.mapGenreMovie(movies)
        return result;
        
    }catch(error){
        console.error(error.message)
        throw new Error('❌ Lỗi lấy dữ liệu của movie')
    }
    
}

const getMovieStatus = async (status) => {
    try {
        const validStatus = [ "Đang Chiếu", "Sắp Chiếu" ];
        if (!status || !validStatus.includes(status)) {
            throw new Error("❌ Trạng thái phim không hợp lệ");
        }

        const movies = await movieModel.find({ status });
        const result = mapGenre.mapGenreMovie(movies)
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error('❌ Lỗi lấy dữ liệu của movie');
    }
};

const getDetailMovie = async (id) => {
     try {

        if (!id ) {
            throw new Error("❌ id phim không hợp lệ");
        }

        const movies = await movieModel.findById(id);
        const result = mapGenre.mapGenreMovieOne(movies)
        return result;
    } catch (error) {
        console.error(error.message);
        throw new Error('❌ Lỗi lấy dữ liệu của movie');
    }
}


module.exports = { getMovies, getMovieStatus, getDetailMovie };
