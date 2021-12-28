const mongoose = require("mongoose");

const { Schema } = mongoose;

const posterSchema = new mongoose.Schema({
  img: { data: Buffer, contentType: String },
});

const clubRecruitSchema = new Schema({
  name: {
    type: String,
    required: true,
    ref: "Club",
  },

  memberNumber: {
    type: Number,
  },
});

module.exports = mongoose.model("ClubIndex", clubIndexSchema);
