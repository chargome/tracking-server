const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization == 'Bearer 394hfui...'
  if (! authorization) {
    return res.status(401).send({ error: 'Please log in 🤡'});
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'CAZZO', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You gotta be kidding me! 🤬'});
    }

    const { userId } = payload;
    // todo handle user not found
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};