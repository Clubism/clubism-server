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
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
    require: true,
    default: this._id
  },
  childComment : {
      type: Array,
      require: true,
  },
  _class : {
    type : Number,
    require : true,
    default : 0,
  },
  date : {
    type : Date,
    default : Date.now,
  },
  writer : {
    type : String,
  },
}
);


module.exports = mongoose.model('Comment', commentSchema);