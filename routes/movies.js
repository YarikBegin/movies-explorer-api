const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationPostMovie, validationDeleteMovie } = require('../middlewares/validation');

router.get('/', getMovies);

router.post(
  '/',
  validationPostMovie,
  createMovie,
);

router.delete(
  '/:movieId',
  validationDeleteMovie,
  deleteMovie,
);

module.exports = router;
