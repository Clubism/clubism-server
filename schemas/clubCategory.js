/*
const mongoose = require('mongoose');

const {Schema} = mongoose;

const clubCategorySchema = new Schema({
  value : {
    type : String
  },
  title : {
    type : String
  },
  itemId : {
    type : String,
  }
});

module.exports = mongoose.model('ClubCategory', clubCategorySchema);

const all = new ClubCategory({
  value : "all",
  title : "전체보기",
  itemId: "/mainClub"
});

all.save();
*/