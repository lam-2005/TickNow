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
    try {
        const validStatus = [ "Đang Chiếu", "Sắp Chiếu" ];
        console.log(status);
        if (!status || !validStatus.includes(status)) {
            throw new Error("❌ Trạng thái phim không hợp lệ");
        }

        const movies = await movieModel.find({ status });
        return movies;
    } catch (error) {
        console.error(error.message);
        throw new Error('❌ Lỗi lấy dữ liệu của movie');
    }
};


module.exports = { getMovies, getMovieStatus };
