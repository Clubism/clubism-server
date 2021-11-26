const express = require('express');
const Post = require('../schemas/post');
const router = express.Router();


router.post('/submit', async(req, res)=>{
  const {title, content, category} = req.body;
  console.log("title : ", title);
  console.log("content : ", content);

  await Post.create({
    title : title,
    content : content,
    category : category,
  });
  
  return res.send("post submit success");
});


module.exports = router;