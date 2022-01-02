const mongoose = require("mongoose");

const { Schema } = mongoose;

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  memberNumber: {
    type: Number,
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
});

module.exports = mongoose.model("Club", clubSchema);
