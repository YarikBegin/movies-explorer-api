const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { signUp, signIn } = require('../middlewares/validation');
const { NotFoundError } = require('../errors/errors');

router.post(
  '/signin',
  signIn,
  login,
);

router.post(
  '/signup',
  signUp,
  createUser,
);

router.use('/users', auth, userRoutes);
router.use('/movies', auth, movieRoutes);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
