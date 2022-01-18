const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const local = require('./localStrategy');
const User = require('../schemas/user');

const SECRET_KEY = process.env.JWT_SECRET;
const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET_KEY,
};

const JWTVerify = async (jwtPayload, done) => {
  try {
		// payload의 id값으로 유저의 데이터 조회
    const user = await User.findOne({ id: jwtPayload.id });
		// 유저 데이터가 있다면 유저 데이터 객체 전송
    if (user) {
      done(null, user);
      return;
    }
		// 유저 데이터가 없을 경우 에러 표시
    
    done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
}

module.exports = ()=>{
  /*
  passport.serializeUser((user, done)=>{
    done(null, user.id);
  });

  passport.deserializeUser((id, done)=>{
    User.findOne({id : id})
    .then((user)=>{
      done(null, user);
    })
    .catch((err)=>{
      done(err);
    });
  });
*/
  local();
  passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));
};

