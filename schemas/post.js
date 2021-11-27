const mongoose = require('mongoose');

const {Schema} = mongoose;

var commentSchema = new Schema({
  comment : {
    type : String,
  },
  postNum : {
    type : Number,
  },
  class : {
    type : Number,
  },
  date : {
    type : Date,
    default : Date.now,
  },
  writer : {
    type : String,
  }
});

const postSchema = new Schema({
  title : {
    type : String,
    required : true,
  },
  content : {
    type : String,
  },
  comment : commentSchema,
  writer : {
    type : String,
  },
  category : {
    type: String,
  },
  date : {
    type: Date, 
    default: Date.now
  },
  state: {
    type : Boolean,
    default : true,
  },
  postNum : {
    type : Number,
    default : 0,
  }
});

module.exports = mongoose.model('Post', postSchema);