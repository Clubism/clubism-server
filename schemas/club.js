const mongoose = require("mongoose");
const Recruitment = require('./recruitment');
const { Schema } = mongoose;

const posterSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String },
});

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
  memberNumber: {
    type: Number,
  },
  memberTotal: {
    type: Number,
  },
  birth: {
    type: Date,
  },
  room: {
    type: String,
  },
  poster: posterSchema,
  recruitments : [{type : Schema.Types.ObjectId, ref : 'Recruitment'}]
});

module.exports = mongoose.model("Club", clubSchema);
