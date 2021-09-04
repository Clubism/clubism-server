const express = require('express');
const router = express.Router();

router.post('/join', async(req, res)=>{
  const {username, id, password} = req.body;
  await User.create({
    username : username,
    id : id,
    password : password,
    // 이 부분은 회원가입 폼에 따라서 달라짐.
  });
  res.redirect('/');
});

router.post('/login', (req, res)=>{
  passport.authenticate('local', (authError, user, info)=>{
    // local 로그인 인증
    if(authError){
      console.error(authError);
      return next(authError);
    }
    if(!user){
      return res.redirect(`/auth/login/Eror=${info.message}`);
      // 이 부분은 info.message에 따라 다르게 구현할 예정
      // 일단은 리디렉션 시킴
    }
    req.logIn(user, (loginError)=>{
      if(loginError){
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    })
  })(req, res, next);
});

router.get('/logout', async(req, res, next)=>{
  req.logOut();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;