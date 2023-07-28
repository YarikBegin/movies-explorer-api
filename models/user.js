const mongoose = require('mongoose');
const validator = require('validator');
const { errorMessages } = require ('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: errorMessages.incorrectEmail,
      }
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
)

module.exports = mongoose.model('User', userSchema);