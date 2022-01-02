const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
  id : {
    type : String,
    required : true,
    maxLength : 20,
  },
  password : {
    type : String,
    required : true,
    maxLength : 100,
  },
  nickname : {
    type : String,
    required : false,
    maxLength : 10,
  },
  isClubMember : {
    type : Boolean,
    required : false,
  },
  userClub : {
    type : String,
    ref : 'Club'
  },
  studentNumber : {
    type : String,
    required : false,
  },
  favorite : [String],
});

module.exports = mongoose.model('User', userSchema);