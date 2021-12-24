const express = require('express');
const router = express.Router();
const ClubCategory = require('../schemas/clubCategory');
const Club = require('../schemas/club');

router.get('/mainClub/:key', (req, res)=>{
  res.render('index');
});

// 중앙 동아리 카테고리들 불러오기
router.get('/category', async(req, res)=>{
  const categories = ClubCategory.find();
  res.send(categories);
});

router.get('/clubs', async(req, res)=>{
  const clubs = await Club.find({});
  res.send(clubs);
});

module.exports = router;