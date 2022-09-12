const Error400 = {
  status: 400,
  message: 'Произошла ошибка, переданы некорректные данные.',
};

const Error404 = {
  status: 404,
  message: 'Произошла ошибка, карточка или пользователь не найден или был запрошен несуществующий роут.',
};

const Error500 = {
  status: 500,
  message: 'На сервере произошла ошибка.',
};

module.exports = {
  Error400,
  Error404,
  Error500,
};
