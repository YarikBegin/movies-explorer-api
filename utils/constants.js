const validationRegex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/i;

const errorMessages = {
  image: 'Некорректный формат ссылки на картинку',
  trailerLink: 'Некорректный формат ссылки на трейлер',
  thumbnail: 'Некорректный формат ссылки на постер',
  createMovie: 'Некорректные данные при создании фильма',
  movieNotFound: 'Фильм не найден',
  removeMovie: 'Попытка удалить фильм другого пользователя',
  userNotFound: 'Пользователь не найден',
  createUser: 'Пользователь уже существует',
  updateProfile: 'Email уже зарегистрирован',
  incorrectData: 'Неправильные почта или пароль',
  incorrectEmail: 'Некорректный формат почты',
  incorrectPath: 'Неправильный путь',
  auth: 'Необходима авторизация',
  crash: 'Сервер сейчас упадёт',
}


module.exports = { validationRegex, errorMessages };