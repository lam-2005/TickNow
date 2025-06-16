const express = require('express');
const router = express.Router()

const movieControler = require('../controler/movies.controler');

router.get('/', async (req,res,next) => {
    try{
        const { status } = req.query;
        let result
        
        if(status){
            result = await movieControler.getMovieStatus(status);
        }else{
            result = await movieControler.getMovies();
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
})

router.get('/:id', async (req,res,next) => {
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
})

module.exports = router