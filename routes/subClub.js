const express = require('express');
const router = express.Router();
const SubClub = require('../schemas/subclubs');
const RecruitSub = require('../schemas/recruitSub');

// 중앙 동아리들 전부 불러오기
router.get('/clubs', async(req, res)=>{
  const clubs = await SubClub.find({});
  res.send(clubs);
});

// 공고 불러 오기
router.get('/recruitment', async(req, res)=>{
  const recruitments = await RecruitSub.find({}).populate('clubId'); 
  console.log("recruitments : ", recruitments);
  /*
  recruitments.map((r)=>{
    console.log(r);
    r.deadline.slice(0, 10);
    return r;
  })*/
  //console.log(recruitments);
  res.send(recruitments);
});

module.exports = router;