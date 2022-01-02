const express = require("express");
const router = express.Router();

const Recruitment = require("../schemas/recruitment");
const Club = require('../schemas/club');
const SubClub = require('../schemas/subclubs');

router.post("/post", async(req, res)=>{
  const {type, club, clubName, description, deadline} = req.body;
  var clubId = "";

  if(type === 'mainClub'){
    clubId = await Club.find({name : club});    
  }
  else{
    clubId = await SubClub.find({name : clubName});
  }
  await Recruitment.create({
      clubId : clubId._id,
      description : description,
      deadline : deadline,
      type : type,
    });
  

  res.send("ok");
});


module.exports = router;
