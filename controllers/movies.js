const Movie = require('../models/movie');
const {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
} = require('../errors/errors');
const { errorMessages } = require('../utils/constants');

const getMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId }).populate('owner')
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
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

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(errorMessages.movieNotFound);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorMessages.removeMovie);
      } else {
        return Movie.findByIdAndRemove(movieId)
          .then((removedMovie) => res.send(removedMovie))
          .catch((error) => {
            next(error);
          });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequestError(errorMessages.movieNotFound);
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
