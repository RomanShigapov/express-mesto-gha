const User = require('../models/user');

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Пользователь с запрашиваемым _id ='${userId}' не найден.` });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Запрос содержит неккоректные данные.' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Не найден пользователь, с запрашиваемым _id ='${userId}', обновление профиля невозможно.` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Запрос содержит неккоректные данные, обновление профиля невозможно.' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Запрос содержит некорректное _id ='${userId}' пользователя, обновление профиля невозможно.` });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: `Не найден пользователь, с запрашиваемым _id ='${userId}', обновление аватара невозможно.` });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Запрос содержит неккоректные данные, обновление аватара невозможно' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(404).send({ message: `Запрос содержит некорректное _id ='${userId}' пользователя, обновление аватара невозможно.` });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
};
