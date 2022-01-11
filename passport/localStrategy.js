const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../schemas/user');

module.exports = ()=>{
  passport.use(new LocalStrategy({
    usernameField : 'id',
    passwordField : 'password',
    // 이 부분은 나중에 html form 부분에서 name field랑 맞춰야 함
  }, async(id, password, done)=>{
    try{
      const exUser = await User.findOne({id : id});
      console.log(exUser);
      if(exUser){ 
        const checked = await bcrypt.compare(password, exUser.password);
        console.log(password, exUser.password);
        if(checked){  // 비밀번호까지 일치
          done(null, exUser);
        }
        else{ // 비밀번호 틀림
          done(null, false, {message : 'wrong password'});
        }
      }else{ // db 조회 실패 
        done(null, false, {message : 'No such user'});
      }
      
    }catch(error){
      console.error(error);
      done(error);
    }
  }));
};