const postModel = require('../model/post.model');

const getPosts = async () => {
    try{
        const posts = await postModel.find();
        return posts;
    }catch(error){
        console.error(error);
        throw new Error("❌ Lỗi lấy dữ liệu từ post");
    }
} 

module.exports = { getPosts };
