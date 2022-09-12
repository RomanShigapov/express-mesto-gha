const Card = require('../models/card');
const { Error400, Error404, Error500 } = require('../utils/errors');

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(Error404.status).send({ message: Error404.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(Error404.status).send({ message: Error404.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFound');
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(Error400.status).send({ message: Error400.message });
        return;
      }
      if (err.name === 'NotFound') {
        res.status(Error404.status).send({ message: Error404.message });
        return;
      }
      res.status(Error500.status).send({ message: Error500.message });
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
