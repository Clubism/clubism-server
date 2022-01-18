const mongoose = require("mongoose");
const SubClub = require("./subclubs");

const { Schema } = mongoose;

const recruitSubSchema = new Schema({
  // 해당 공고를 낸 동아리의 _id
  clubId: {
    type: Schema.Types.ObjectId,
    ref: SubClub,
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
});

module.exports = mongoose.model("RecruitSub", recruitSubSchema);