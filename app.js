const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '631dde772061cace33af094a', //631ddfc42061cace33af094c
  };

  next();
});

app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log('Serv started');
});
