const { errorMessages } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? errorMessages.serverError : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
