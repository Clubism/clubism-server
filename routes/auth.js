const express = require("express");
const passport = require("passport");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();
const saltRounds = 10;

const SECRET_KEY = process.env.JWT_SECRET;

router.post('/token', async(req, res)=>{
  // request에서 body로 clientSecret이 담겨서 와야 함
  const {clientSecret} = req.body;

  try{
  // query param으로 id를 넣음
    const id = req.query.id;

    const user = await User.findOne({id : id});

    const token = jwt.sign({
      id : id,
    }, process.env.JWT_SECRET, {
      expiresIn : '1m',
      issuer : 'clubism'
    });
    return res.json({
      code : 200,
      message : "token is issued",
      token,
    });
  }catch(err){
    console.error(err);
    return res.status(500).json({
      code : 500,
      messsage : "server error",
    });
  }
});

router.post('/test', passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
	  try {
	    res.json({ result: true });
	  } catch (error) {
	    console.error(error);
	    next(error);
	  }
});

router.get('/userSession', (req, res)=>{
  //console.log(req.session);
  //console.log(req.session.isLoggedIn);
  console.log(req.isAuthenticated());
  return res.send({isLoggedIn : req.session.isLoggedIn});
});

router.get('/join', (req, res)=>{
  res.render('join');
});

router.post("/join", async (req, res) => {
  console.log(req.body);
  // console.log("test1");
  const { username, id, password } = req.body;
  // const { username, id, password } = JSON.parse(req.body);
  // username, id, password를 가입할때 받는 것으로 가정.
  // console.log(username, id, password);
  bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    // Store hash in your password DB.
    try {
      await User.create({
        username: username,
        id: id,
        password: hashedPassword,
        // 이 부분은 회원가입 폼에 따라서 달라짐.
      });
    } catch (e) {
      console.log("here!!!");
      console.log(e);
    }
  });

  res.redirect("/");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async(req, res, next) => {
  passport.authenticate("local", {session : false}, (authError, user, info) => {
    // local 로그인 인증
    if (authError) {
      console.error(authError);
      res.send("login error");
      return next(authError);
    }
    if (!user) {
      if (info.message === "No such user") {
        return res.send("no such user");
      } else if (info.message === "wrong password") {
        return res.send("wrong password");
      }
      return res.send("login error");
      // 이 부분은 info.message에 따라 다르게 구현할 예정
      // 일단은 리디렉션 시킴
    }
    req.logIn(user, {session : false}, (loginError) => {
      if (loginError) {
        res.send("login error");
        console.error(loginError);
        return next(loginError);
      }

      try {
        const token = jwt.sign({
          id : user.id
          }, SECRET_KEY, {
          expiresIn: '1h'
        });

        console.log("login success until here");
          /*
          res.cookie('user', token);
          res.status(201).json({
            result: 'ok',
            token
          });
        */
        //return res.json({ user, token });
        return res.status(201).send({user, token});
      } catch (err) {
        console.error(err);
        next(err);
      }
    })
  })(req, res, next);
});

router.get("/logout", async (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

// 즐겨찾기 db에 추가
router.post('/favorites/:userId', async(req, res)=>{
  const userId = req.params.userId
  const clubName = req.body;
  const user = await User.find({_id : userId});
  user.favorites.push(clubName);
});

// 즐겨찾기한 동아리 불러오기
router.get('/favorites/:userId', async(req, res)=>{
  const userId = req.params.userId
  const user = await User.find({_id : userId});
  res.json(user.favorites);
});

// id 중복 확인
router.get('/checkId', async(req, res)=>{
  const id = req.query.id;
  const user = await User.findOne({id : id});
  res.json(user);
});
module.exports = router;

