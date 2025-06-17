const movieServiece = require('../service/movie.service')

const getMovies =async (req,res,next) => {
    try{
        const { status } = req.query;
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        console.log(limit, page);
        let result
        
        if(status){
            result = await movieServiece.getMovieStatus(status, limit, page);
        }else{
            result = await movieServiece.getMovies(limit, page);
        }

        if(result){
            return res.status(200).json({ data: result ,status: true, message: 'Lấy dữ liệu thành công'})
        }else{
            return res.status(404).json({ status: false, message: 'Lấy dữ liệu thất bại' })
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({status: false, message: 'Lấy dữ liệu movie thất bại'})
    }
}

const getDetailMovie = async (req,res,next) => {
    try {
        const { id } = req.params;
        let result = await movieControler.getDetailMovie(id);
        if(result){
            return res.status(200).json({ data: result ,status: true, message: 'Lấy dữ liệu thành công'})
        }else{
            return res.status(404).json({ status: false, message: 'Lấy dữ liệu thất bại' })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({status: false, message: 'Lấy dữ liệu movie thất bại'})
    }
}


module.exports = { getMovies, getDetailMovie };
