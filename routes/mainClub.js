const express = require("express");
const router = express.Router();
const ClubCategory = require("../schemas/clubCategory");
const Club = require("../schemas/club");
const Recruitment = require("../schemas/recruitment");
const passport = require("passport");
const clubRecruitment = require("../schemas/clubRecruit");
const ObjectId = require('mongodb').ObjectID;

router.get("/mainClub/:key", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.render("index");
  }
);

router.get("/clubinfo/:name", async (req, res) => {
clubname = req.params;
  const clubdata = await Club.find({ label: clubname.name }); //&&****************************
  res.send(clubdata);
});

router.post("/clubinfo/:name", async (req, res) => {
  // console.log(req);
  // console.log(res);
  console.log(req.body);
});

// 중앙 동아리 카테고리들 불러오기
router.get("/category", passport.authenticate("jwt", { session: false }),async (req, res) => {
    const categories = ClubCategory.find();
    res.send(categories);
  }
);

// 중앙 동아리들 전부 불러오기
router.get("/clubs", async (req, res) => {
    const clubs = await Club.find({});
    res.send(clubs);
  }
);

// 공고 불러 오기
// router.get("/recruitment",  async (req, res) => {
//   const recruitments = await Recruitment.find({}).populate("clubId");
  
//     /*
//   recruitments.map((r)=>{
//     console.log(r);
//     r.deadline.slice(0, 10);
//     return r;
//   })*/
//     //console.log(recruitments);
//     res.send(recruitments);
//   }
// );


router.get('/recruitment/recent', async (req, res) => {
  const club = await Club.find({}).populate("recruitment").sort({ createdAt: -1 });
  console.log(club);

  res.send(club);
  
});

// 해당 id를 가진 동아리의 최신 공고만 남겨줌
router.get('/recruitment/recent/:id', async (req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id).populate("recruitment").sort({ createdAt: -1 });

  res.send(club);
});

// 해당 id를 가진 동아리의 모든 공고를 넘겨줌
router.get('/recruitment/all/:id', async(req, res) => {
  const { id } = req.params;
  const club = await Club.findById(id).populate("recruitment");

  res.send(club);
});

router.get("/clubRecruit/:clubname", async (req, res) => {
  const clubRecruit = await clubRecruitment.find({});
  console.log(clubRecruit);
  res.send(clubRecruit);
});

module.exports = router;
