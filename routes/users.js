const router = require('express').Router();
const { validationUpdateUser } = require('../middlewares/validation');
const {
  getMe,
  updateProfile,
} = require('../controllers/users');

router.get('/me', getMe);

router.patch(
  '/me',
  validationUpdateUser,
  updateProfile,
);

module.exports = router;
