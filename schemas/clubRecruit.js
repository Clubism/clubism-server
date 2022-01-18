const mongoose = require("mongoose");

const { Schema } = mongoose;

const clubRecruitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  recruitNumber: {
    type: Number,
    required: true,
  },
  recruitStart: {
    type: Date,
    default: Date.now,
  },
  recruitEnd: {
    type: Date,
    required: true,
  },
  clubIntro: {
    type: String,
  },
});

module.exports = mongoose.model("ClubRecruit", clubRecruitSchema);
