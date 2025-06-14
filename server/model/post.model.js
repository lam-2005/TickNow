const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const postSchema = new Schema({ 
    id_user: {type: ObjectId, required: true},
    content: {type: String, required: true},
    start_day: {type: Date, required: true},
    end_day: { type: Date, required: true},
    status: { type: String, required: false, default: "Hoạt Động" },
    img: {type: String, required: true}
})

module.exports = mongoose.models.post || mongoose.model('post', postSchema);