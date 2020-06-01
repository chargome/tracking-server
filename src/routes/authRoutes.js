const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const JWT_KEY = 'CAZZO';
const User = mongoose.model('User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });

  try {
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_KEY);
    res.send({ token });
  } catch (err) {
    console.log(err);
    return res
      .status(422)
      .send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ error: 'pLEasE PRoVide EmAiL aND pAsSwoRD 🦦' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .send({ error: 'iNvALid pasSwORd or eMAil 🦨' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, JWT_KEY);
    return res.send({ token });
  } catch (error) {
    return res
      .status(404)
      .send({ error: 'iNvALid pasSwORd or eMAil 🦨' });
  }
});

module.exports = router;