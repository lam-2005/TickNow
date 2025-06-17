const movieModel = require('../model/movies.model');
const mapGenre = require('../utils/mapGenreMovie');
const paginate = require('../utils/pagination');

const getMovies = async ( filter, limit, page) => {
    try{

        const {data, pagination} = await paginate.paginateQuery(movieModel, filter, page, limit);

        const movie = await mapGenre.mapGenreMovie(data);
        
        const result = {
            movie,
            pagination
        }
        return result;
        
    }catch(error){
        console.error(error.message)
        throw new Error('❌ Lỗi lấy dữ liệu của movie')
    }
    
}


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


module.exports = { getMovies, getDetailMovie };