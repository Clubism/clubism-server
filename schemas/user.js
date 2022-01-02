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
  username : {
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
  major : {
    type : String,
    required : false,
  },
  subMajor : {
    type : String,
    requied : false,
  },
});

module.exports = mongoose.model('User', userSchema);