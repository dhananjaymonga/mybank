const mongoose = require('mongoose');

const contactSubSchema = mongoose.Schema({
  name: String,
  amount: {
    type: Number,
    default: 0
  }
})

const historySchema = mongoose.Schema({
  name: String,
  amount: Number,
  date: {
    type: Date,
    default: Date.now()
  }
})

const contactSchema = mongoose.Schema({
  contacts: [contactSubSchema],
  history: [historySchema],
  userID: mongoose.Types.ObjectId
})

module.exports = mongoose.model('contact', contactSchema);
