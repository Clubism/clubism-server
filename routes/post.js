const express = require('express');
const Post = require('../schemas/post');
const Comment = require('../schemas/comment');
const ObjectID = require('mongodb').ObjectID;
const router = express.Router();

router.get('/', async(req, res)=>{
  // 날짜 내림차순으로 게시글을 db에서 얻어옴
  const posts = await Post.find().sort({"date" : -1})

  res.json(posts);
});

router.post('/submit', async(req, res)=>{
  // req의 body에서 넘어온 data를 구조할당 분해
  const {title, content, category, postNum} = req.body;
 
  // 객체로 만들고 post db에 추가
  await Post.create({
    title : title,
    content : content,
    category : category,
    postNum : postNum,
    id : id
  });
  
  // post submit success라고 프론트에 응답
  return res.send("post submit success");
});


//프론트에서 백으로 특정 게시물에 대한 댓글들을 요청했을 때
router.get('/comment/:id', async(req, res)=>{
  // 게시글 id
  const id = req.params.id;
  // 해당 id를 갖는 게시글에 대한 댓글 찾기
  const comments = await Comment
      .find({postNum : id})
      .sort({"parentComment":1});

  console.log(comments);
  // comments = comments.comment;

  // 댓글이 1도 안달렸을 때
  if(comments === undefined){
    return res.send('no comment');
  }
  // 댓글이 달렸을 때
  else{
    return res.json(comments);
  }
})


//댓글
router.post('/comment/:id', async(req, res)=>{
  const {comment, postNum, parentComment, _class} = req.body;
 
  console.log("body", req.body);
  // console.log("test", req);
  // 객체로 만들고 post db에 추가

  await Comment.create({
    comment : comment,
    postNum : postNum,
    parentComment : ObjectID(parentComment),
    _class : _class
  });

  // // post submit success라고 프론트에 응답
  return res.send("post submit success");

});

module.exports = router;