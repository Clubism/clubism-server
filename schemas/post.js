const mongoose = require('mongoose');

const {Schema} = mongoose;
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose.connection);

const postSchema = new Schema({
  title : {
    type : String,
    required : true,
  },
  content : {
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
  },
  state: {
    type : Boolean,
    default : true,
  },
  postNum : {
    type : Number,
    index: true,
  },
  id: {
    type: Number,
    required : true,
  }
});

postSchema.plugin(autoIncrement.plugin, {
  model: 'Post',
  field: 'id',
  startAt: 0,
  increment: 1
});


module.exports = mongoose.model('Post', postSchema);