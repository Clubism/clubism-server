const passport = require('passport');
const local = require('./localStrategy');
const User = require('../schemas/user');

module.exports = ()=>{
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

  local();
};

