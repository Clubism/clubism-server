const express = require("express");
const passport = require("passport");
const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { smtpTransport } = require("../middlewares/nodemailer");
const saltRounds = 10;

const SECRET_KEY = process.env.JWT_SECRET;

// access token이 만료됐을 경우
router.post("/refresh", passport.authenticate("jwt", { session: false }), async(req, res)=>{
  async (req, res, next) => {
    try {
      const accessToken = jwt.sign({ id: req.user.id, }, SECRET_KEY, { expiresIn: "1h", });
      return res.status(201).send({ user, accessToken});
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}); 

// access token을 verify하는 함수
router.post("/test", passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    //jwtDecode(req.authorization);
    try {
      return res.json({ ok: true });
    } catch (error) {
      console.log("here");
      console.error(error);
      next(error);
    }
  }
);

router.get("/userSession",  (req, res) => {
  //console.log(req.session);
  //console.log(req.session.isLoggedIn);
  console.log(req.isAuthenticated());
  return res.send({ isLoggedIn: req.session.isLoggedIn });
});

router.get("/join", (req, res) => {
  res.render("join");
});

router.post("/join", async (req, res) => {
  console.log(req.body);
  // console.log("test1");
  const { username, id, password, favorites, major, subMajor, emailNotification, emailSogang } = req.body;
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
        favorites : favorites,
        major : major,
        subMajor : subMajor,
        emailNotification : emailNotification, 
        emailSogang : emailSogang,
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
  passport.authenticate("local", { session: false }, (authError, user, info) => {
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
      req.logIn(user, { session: false }, (loginError) => {
        if (loginError) {
          res.send("login error");
          console.error(loginError);
          return next(loginError);
        }

        try {
          const accessToken = jwt.sign({id: user.id,},SECRET_KEY,{expiresIn: "1h",});
          const refreshToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '14d' });
          return res.status(201).send({ user, accessToken, refreshToken });
        } catch (err) {
          console.error(err);
          next(err);
        }
      });
    }
  )(req, res, next);
});

router.get("/logout",async (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

// 즐겨찾기 db에 추가
router.post("/favorites/:userId", async (req, res) => {

  const userId = req.params.userId;
  const clubName = req.body.clubName;
  await User.updateOne(
    { _id: userId },
    { $addToSet: { favorites: clubName }}
    // {
    //   $push: {favorite : clubName}
    // });
  );
  const favs = await User.findOne({ _id: userId });
  res.send(favs.favorites);
});
// 즐겨찾기한 동아리 불러오기
router.get("/favorites/:userId", async (req, res) => {
  const userId = req.params.userId;
  console.log("userId : ", userId);
  const user = await User.findOne({ _id: userId });

  res.json(user.favorites);
});

// id 중복 확인
router.get("/checkId", async (req, res) => {
  const id = req.query.id;
  const user = await User.findOne({ id: id });
  res.json(user);
});

// 인증번호 발급을 위해 임의의 6자리 숫자를 생성
const generateRandom = function (min, max) {
  var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return ranNum;
};

// 이메일 인증 라우터
router.post("/emailVerification", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { sendEmail } = req.body;

  const code = generateRandom(111111, 999999);

  const mailOptions = {
    from: "clubism",
    to: sendEmail,
    subject: "[clubism] 인증 번호 입력",
    text: "오른쪽 숫자 6자리를 입력해주세요 : " + code,
  };

  await smtpTransport.sendMail(mailOptions, (err, res) => {
    smtpTransport.close();
    if (err) {
      console.error(err);
    }
  });
  console.log("here");

  // 나중에 클라이언트 단에선 안보이게 처리해야 함
  // 왜냐면 그냥 아무 메일이나 쓰고 개발자 도구에서 확인할 수 있으니깐

  res.send({code: code,});
});
module.exports = router;
