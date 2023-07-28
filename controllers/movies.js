const Movie = require('../models/movie');
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require('../errors/errors');
const { errorMessages } = require('../utils/constants');

getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId }).populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
}

createMovie = (req, res, next) => {
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    movieId,
    country,
    director,
    duration,
    year,
    description,
    owner,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        next(new BadRequestError(errorMessages.createMovie));
      } else {
        next(err);
      }
    });
};

deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) next(new NotFoundError(errorMessages.movieNotFound));
      if (req.user._id === movie.owner.toString()) {
        return movie.remove();
      }
      return next(new ForbiddenError(errorMessages.removeMovie));
    })
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};