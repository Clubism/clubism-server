const express = require("express");
const passport = require("passport");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const router = express.Router();

const saltRounds = 10;

router.get("/join", (req, res) => {
  res.render("join");
});

router.post("/join", async (req, res) => {
  console.log(req.body);
  console.log("test1");
  const { username, id, password } = req.body;
  // const { username, id, password } = JSON.parse(req.body);
  // username, id, password를 가입할때 받는 것으로 가정.
  console.log(username, id, password);
  bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    // Store hash in your password DB.
    console.log(hashedPassword);
    await User.create({
      username: username,
      id: id,
      password: hashedPassword,
      // 이 부분은 회원가입 폼에 따라서 달라짐.
    });
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
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/auth/login/Error=${info.message}`);
      // 이 부분은 info.message에 따라 다르게 구현할 예정
      // 일단은 리디렉션 시킴
    }
    req.logIn(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", async (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
