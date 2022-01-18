const express = require("express");
const router = express.Router();
const ClubCategory = require("../schemas/clubCategory");
const Club = require("../schemas/club");
const Recruitment = require("../schemas/recruitment");
const clubRecruitment = require("../schemas/clubRecruit");

// router.get("/mainClub/:key", (req, res) => {
//   res.render("index");
// });

router.get("/clubinfo/:name", async (req, res) => {
  clubname = req.params;
  const clubdata = await Club.find({ label: clubname.name }); //&&****************************
  res.send(clubdata);
});

// 중앙 동아리 카테고리들 불러오기
router.get("/category", async (req, res) => {
  const categories = ClubCategory.find();
  res.send(categories);
});

// 중앙 동아리들 전부 불러오기
router.get("/clubs", async (req, res) => {
  const clubs = await Club.find({});
  res.send(clubs);
});

// 공고 불러 오기
router.get("/recruitment", async (req, res) => {
  const recruitments = await Recruitment.find({}).populate("clubId");
  /*
  recruitments.map((r)=>{
    console.log(r);
    r.deadline.slice(0, 10);
    return r;
  })*/
  //console.log(recruitments);
  res.send(recruitments);
});

router.get("/clubRecruit/:clubname", async (req, res) => {
  const clubRecruit = await clubRecruitment.find({});
  console.log(clubRecruit);
  res.send(clubRecruit);
});

module.exports = router;
