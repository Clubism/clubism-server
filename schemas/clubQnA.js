const mongoose = require('mongoose');

const {Schema} = mongoose;

const QnASchema = new Schema({
  name : {
    type : String,
    required : true,
    ref : 'Club',
  },
  title : {
    type : String,
    required: true,
  },
  content : {
    type : String,
    required : true,
  },
  answer : {
    type : String,
    required : false,
  },
  ifAnswered : {
    type : Boolean,
    default : false,
  }
});

module.exports = mongoose.model('QnA', QnASchema);