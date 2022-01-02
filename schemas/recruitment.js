const mongoose = require("mongoose");
const Club = require("./club");

const { Schema } = mongoose;

const recruitmentSchema = new Schema({
  // 해당 공고를 낸 동아리의 _id
  clubId: {
    type: Schema.Types.ObjectId,
    ref: Club,
  },
  description: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  deadline : {
    type : Date
  },
  type : {
    type : String,
  }
});

module.exports = mongoose.model("Recruitment", recruitmentSchema);
