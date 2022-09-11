const Card = require('../models/card');

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ owner, name, link })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Запрос содержит неккоректные данные' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: `Не найдена карточка места с запрашиваемым _id ='${cardId}', удаление невозможно.` });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Запрос содержит неккоректные данные' });
        return;
      }
      res.status(500).send({ message: err.message });
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
};
