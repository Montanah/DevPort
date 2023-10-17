const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
  },
  socials:[{
    twitter: {
      type: String,
      lowercase: true,
      default: null,
      required: false,
    },
    linkedIn: {
      type: String,
      lowercase: true,
      default: null,
      required: false
    }
  }],
  phone: {
    type: Number,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;