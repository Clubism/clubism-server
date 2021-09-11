const mongoose = require('mongoose');

const {Schema} = mongoose;

const posterSchema = new mongoose.Schema(
  { img: { data: Buffer, contentType: String }}
);

const clubIndexSchema = new Schema({
  name : {
    type : String,
    required : true,
    ref : 'Club',
  },

  memberNumber : {
    type : Number,
  },

  poster : posterSchema,

  introduction : {
    type : String,
  },

  mainActivity : {
    type : String
  },
});

module.exports = mongoose.model('ClubIndex', clubIndexSchema);