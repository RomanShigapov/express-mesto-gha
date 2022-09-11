// app.js — входной файл

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// подключаем мидлвары, роуты и всё остальное...

app.listen(3000, () => {
  console.log('Serv started');
});