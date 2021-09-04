const mongoose = require('mongoose');

const {Schema} = mongoose;

const clubSchema = new Schema({
  name : {
    type : String,
    required : true,
  },
  memberNumber : {
    type : Number,
  }
});

module.exports = mongoose.model('Club', clubSchema);