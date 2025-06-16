const express = require("express");
const router = express.Router();

const movieControler = require("../controler/movies.controler");

<<<<<<< HEAD
router.get("/", async (req, res, next) => {
  try {
    const movies = await movieControler.getMovies();
    console.log(movies);
    if (movies) {
      return res
        .status(200)
        .json({
          data: movies,
          status: true,
          message: "Lấy dữ liệu thành công",
        });
    } else {
      return res
        .status(404)
        .json({ status: false, message: "Lấy dữ liệu thất bại" });
=======
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
>>>>>>> VanGioiPS42100
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Lấy dữ liệu movie thất bại" });
  }
});

<<<<<<< HEAD
module.exports = router;
=======
router.get('/:id', async (req,res,next) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router
>>>>>>> VanGioiPS42100
