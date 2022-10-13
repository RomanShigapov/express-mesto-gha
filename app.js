const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { Error404 } = require('./utils/errors');
const {
  createUser,
  login,
} = require('../controllers/users');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(helmet());

app.use((req, res, next) => {
  req.user = {
    _id: '631dde772061cace33af094a',
    // _id: '631ddfc42061cace33af094c',
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.all('/*', (req, res) => {
  res.status(Error404.status).send({ message: Error404.message });
});

app.listen(PORT);
