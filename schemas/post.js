const mongoose = require('mongoose');

const {Schema} = mongoose;

const postSchema = new Schema({
  title : {
    type : String,
    required : true,
  },
  content : {
    type : String,
  },
  comment : {
    type : String,
  },
  writer : {
    type : String,
  },
  category : {
    type: String,
  },
  date : {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Post', postSchema);