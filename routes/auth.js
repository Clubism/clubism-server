const express = require("express");
const passport = require("passport");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const axios = require("axios");
const router = express.Router();
const saltRounds = 10;

<<<<<<< HEAD
router.get('/userSession', (req, res)=>{
  //console.log(req.session);
  //console.log(req.session.isLoggedIn);
  console.log(req.isAuthenticated());
  return res.send({isLoggedIn : req.session.isLoggedIn});
});

router.get('/join', (req, res)=>{
  res.render('join');
=======
router.get("/join", (req, res) => {
  res.render("join");
>>>>>>> 1f3c4ee5b81833082810624973d42907609e6d18
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

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
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
    req.logIn(user, (loginError) => {
      if (loginError) {
        res.send("login error");
        console.error(loginError);
        return next(loginError);
      }
<<<<<<< HEAD
      req.session.isLoggedIn = true;
      req.session.name = user.id;
      
      return res.send('login success');
    })
=======
      return res.send("login success");
    });
>>>>>>> 1f3c4ee5b81833082810624973d42907609e6d18
  })(req, res, next);
});

router.get("/logout", async (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
