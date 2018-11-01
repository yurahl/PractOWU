let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Members = new Schema({
   name: {
       type: String,
       required: true
   },
    surname: {
       type: String,
        required: true
    },
    rating:{
       type: Number,
        default: 0
    },
    rank: {
       type: String,
        default: 'member'
    },
    age: Number,
    sectId: {
        type: Schema.ObjectId,
        ref: 'sects'
    }
});

let model = mongoose.model('members', Members);
module.exports = model;