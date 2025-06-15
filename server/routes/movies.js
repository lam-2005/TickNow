const express = require('express');
const router = express.Router()

const movieControler = require('../controler/movies.controler');

router.get('/', async (req,res,next) => {
    try{
        const movies = await movieControler.getMovies();
        console.log(movies);
        if(movies){
            return res.status(200).json({ movies: movies ,status: true, message: 'Lấy dữ liệu thành công'})
        }else{
            return res.status(404).json({ status: false, message: 'Lấy dữ liệu thất bại' })
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({status: false, message: 'Lấy dữ liệu movie thất bại'})
    }
})

module.exports = router