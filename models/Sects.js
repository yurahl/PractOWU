let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Sects = new Schema({
   name: {
       required: true,
       type: String
   },
   magic: {
       type: String,
       required: true
   },
    rating: {
      type: Number,
      default: 0
    },
    membersId: [{
        type: Schema.ObjectId,
        ref: 'members',
        default: undefined
    }]
});


Sects.methods.death = async ()=>{

};


let model = mongoose.model('sects', Sects);

module.exports = model;

