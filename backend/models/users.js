const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'this email is already registered']
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  }
})

module.exports = mongoose.model('user', schema);
