require('./models/user');
require('./models/track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'YOUR_MONGODB_CLOUD_URI';
mongoose.connect(mongoUri,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo 🐒');
});
mongoose.connection.on('err', (err) => {
  console.error('Err on mongo 😳', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Hello ${req.user.email}, you are authorized.`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});