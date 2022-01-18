const User = require('../schemas/user');
const jwt = require('jsonwebtoken');

const YOUR_SECRET_KEY = process.env.SECRET_KEY;

exports.createToken = async function (req, res, next) {
  try {
    const id = req.query.id;
    const user = await User.findOne({id : id});
      if (user) {
        const token = jwt.sign({
          id : id
        }, YOUR_SECRET_KEY, {
        expiresIn: '1h'
      });
      
      res.cookie('user', token);
      res.status(201).json({
        result: 'ok',
        token
      });
      } 
      else {
        res.status(400).json({ error: 'invalid user' });
      }
  } catch (err) {
    console.error(err);
    next(err);
  }
};
