const express = require('express');
const router = express.Router();
const ClubCategory = require('../schemas/clubCategory');
const Club = require('../schemas/club');
const Recruitment = require('../schemas/recruitment');
const passport = require('passport');

router.get('/mainClub/:key', passport.authenticate("jwt", { session: false }), (req, res)=>{
  res.render('index');
});

// 중앙 동아리 카테고리들 불러오기
router.get('/category', passport.authenticate("jwt", { session: false }), async(req, res)=>{
  const categories = ClubCategory.find();
  res.send(categories);
});

// 중앙 동아리들 전부 불러오기
router.get('/clubs', passport.authenticate("jwt", { session: false }), async(req, res)=>{
  const clubs = await Club.find({});
  res.send(clubs);
});

// 공고 불러 오기
router.get('/recruitment', passport.authenticate("jwt", { session: false }), async(req, res)=>{
  const recruitments = await Recruitment.find({}).populate('clubId');
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