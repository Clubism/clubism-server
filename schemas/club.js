const mongoose = require('mongoose');

const {Schema} = mongoose;

const clubSchema = new Schema({
  name : {
    type : String,
    required : true,
    ref : 'Club',
  },
  memberNumber : {
    type : Number,
  }
});

module.exports = mongoose.model('Club', clubSchema);