const express = require('express');
const router = express.Router();

router.get('/mainClub/:key', (req, res)=>{
  res.render('index');
});

module.exports = router;