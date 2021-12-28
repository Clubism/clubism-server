const mongoose = require("mongoose");

const { Schema } = mongoose;

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
    ref: "Club",
  },
  memberNumber: {
    type: Number,
    required: true,
  },
  memberAllNumber: {
    type: Number,
  },
  age: {
    type: Date,
  },
  genderRatio: {
    type: Number,
  },
  latestUpdate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Club", clubSchema);
