const mongoose = require('mongoose');

const {Schema} = mongoose;

const commentSchema = new Schema({
  comment : {
    type : String,
  },
  postNum : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Post',
    require : true,
  },
  class : {
    type : Number,
    default : 0,
  },
  date : {
    type : Date,
    default : Date.now,
  },
  writer : {
    type : String,
  }
});


module.exports = mongoose.model('Comment', commentSchema);