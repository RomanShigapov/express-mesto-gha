const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { Error400, Error404, Error500 } = require('../utils/errors');

const createUser = (req, res) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((user) => res.send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(Error400.status).send({ message: Error400.message });
            return;
          }
          res.status(Error500.status).send({ message: Error500.message });
        });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(Error404.status).send({ message: Error404.message });
        return;
      }
      if (err.name === 'CastError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(Error404.status).send({ message: Error404.message });
        return;
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(Error404.status).send({ message: Error404.message });
        return;
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const login = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-random-key',
        { expiresIn: '7d' },
      );

      res
        .cookie(
          'jwt',
          token,
          {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          },
        )
        .send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        })
        .end();
    })
    .catch(next);
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  login,
};
