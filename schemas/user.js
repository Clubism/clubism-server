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
    maxLength : 20,
  },
  nickname : {
    type : String,
    required : true,
    maxLength : 10,
  },
  isClubMember : {
    type : Boolean,
    required : true,
  },
  userClub : {
    type : String,
    ref : 'Club'
  },
});

module.exports = mongoose.model('User', userSchema);