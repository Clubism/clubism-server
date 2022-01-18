const express = require("express");
const router = express.Router();
const passport = require('passport');
const Recruitment = require("../schemas/recruitment");
const RecruitSub = require('../schemas/recruitSub');
const Club = require('../schemas/club');
const SubClub = require('../schemas/subclubs');

router.post("/post", passport.authenticate("jwt", { session: false }), async(req, res)=>{
  const {type, club, clubName, description, deadline} = req.body;
  
  console.log(req.body);
  

  if(type === 'mainClub'){
    const dbClub = await Club.findOne({name : club});    
    console.log('dbClub : ', dbClub);
    await Recruitment.create({
      clubId : dbClub._id,
      description : description,
      deadline : deadline,
    });
  }
  else{
    const dbClub = await SubClub.findOne({name : clubName});
    console.log('dbClub : ', dbClub);
    await RecruitSub.create({
      clubId : dbClub._id,
      description : description,
      deadline : deadline,
    });
  }
  
  

  res.send("ok");
});


module.exports = router;
