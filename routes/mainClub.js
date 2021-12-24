const express = require('express');
const router = express.Router();
const Club = require("../schemas/club");
const ClubCategory = require('../schemas/clubCategory');

router.get('/mainClub', (req, res)=>{
  res.response(Club.find({}));
});

router.get('/mainClubCategory', (req, res)=>{
  
});


module.exports = router;