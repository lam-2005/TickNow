const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const roomSchema = new Schema({
    code_room: {type: String, required: true},
    id_thear: {type: ObjectId, required: true},
    diagram: {
        row: {type: Number, required: true},
        column: {type: Number, required: true},
        element_remove: { type: Map, of: [Number], default: {} },
        element_selected: { type: Map, of: [Number], default: {} },
        element_selecting: { type: Map, of: [Number], default: {} },
    }

})

module.exports = mongoose.models.room || mongoose.model('room', roomSchema)