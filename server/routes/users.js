const express = require('express');
const router = express.Router();

const userControler = require('../controler/users.controler');

router.get('/', async (req, res, next) => {
    try {
        const users  = await userControler.getUsers();
        if( users ){
            return res.status(200).json({ user: users , status: true, message: 'Lấy dữ liệu thành công'})
        }else{
            console.log(users);
            return res.status(404).json({ status: false, message: 'Lấy dữ liêu không thành công' })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({status: false, message: 'Lấy dữ liệu không thành công'})
    }
})

module.exports = router;