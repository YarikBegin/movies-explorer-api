require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} = require('../errors/errors');
const { errorMessages } = require('../utils/constants');

const SALT_ROUNDS = 10;
const { NODE_ENV, JWT_SECRET } = process.env;

getMe = (req, res, next) => {
  const { _id } = req.user;
  User.find({ _id })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(errorMessages.userNotFound));
      }
      return res.send(...user);
    })
    .catch(next);
};

createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  const createUser = (hash) => User.create({
    name,
    email,
    password: hash,
  });

  const findOne = (hash) => User.findOne({email}).then((user) => ({user, hash}))

  bcrypt
    .hash(password, SALT_ROUNDS)
    .then(findOne)
    .then(({user, hash}) => {
      if(user) {
        throw new ConflictError(errorMessages.createUser)
      }
      return createUser(hash)
    })
    .then((user) => {
      const { _id } = user;
      res.send({
        _id,
        name,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(errorMessages.createUser));
      } else next(err);
    });
};

updateProfile = (req, res, next) => {
  const { name, email } = req.body;

  const findAndUpdate = () => User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { runValidators: true },
  );

  User.find({ email })
    .then(([user]) => {
      if (user && user._id.toString() !== req.user._id) {
        throw new ConflictError(errorMessages.updateProfile);
      }
      return findAndUpdate();
    })
    .then(() => {
      res.send({
        name,
        email,
      });
    })
    .catch(next);
};

login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getMe,
  createUser,
  updateProfile,
  login,
};