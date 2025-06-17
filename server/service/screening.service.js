const screeningModel = require('../model/screening.model');
const movieService = require('../service/movie.service');
const roomControler = require('../controler/room.controler');


const getScreeings = async ( filter ) => {
    try {

        const movies = await movieService.getMovies();
        const movieMap = new Map()

        movies.movie.forEach(movie => {

            movieMap.set(movie._id.toString(), movie.name);

        });

        const rooms = await roomControler.getRooms();
        const roomMap = new Map();

        rooms.forEach(room => {

            roomMap.set(room._id.toString(), room.code_room);

        });

        const screenings = await screeningModel.find( filter );
        
        const result = screenings.map(screening => {
            const movieId = screening.id_movie.toString();
            const roomId = screening.id_room.toString();

            const movieName = movieMap.get(movieId);
            const roomCode = roomMap.get(roomId);
            return {
                ...screening.toObject(),
                movieName: movieName,
                roomCode: roomCode,
            }
        })

        return result;

    } catch (error) {
        console.error(error)
        throw new Error("Lấy dữ liệu không thành công");
    }
}

const getScreeningFilter = async (filter) => {
    try {

        const screenings = await screeningModel.find( filter );
        return screenings

    } catch (error) {
        console.error(error)
        throw new Error("Lấy dữ liệu không thành công");
    }
}

module.exports = { getScreeings, getScreeningFilter }