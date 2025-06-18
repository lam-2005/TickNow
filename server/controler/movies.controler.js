const { default: mongoose } = require('mongoose');
const movieServiece = require('../service/movie.service');
const dayjs = require('dayjs');

const getMovies =async (req,res,next) => {
    try{
        // query host
        const { status, date } = req.query;

        const limit = parseInt(req.query.limit);

        const page = parseInt(req.query.page);

        // create variable storage
        let filter = { };

        let result

        // check variable  
        if (status) filter.status = status;

        if(date){
            const parsedDate = dayjs(date, 'MM-DD-YYYY');
            if(parsedDate.isValid()){

                const start = parsedDate.startOf('day').toDate();
                const end = parsedDate.endOf('day').toDate();

                filter.release_date = {
                    $gte: start,
                    $lte: end
                };
            }else{
                console.warn('⚠️ Ngày không hợp lệ:', date);
            }
        }   

        // get data
        result = await movieServiece.getMovies(filter, limit, page);

        // check data
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
        let result = await movieServiece.getDetailMovie(id);
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
