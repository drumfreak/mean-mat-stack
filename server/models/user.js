const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema ({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  imagePath: {
    type: String
  },
  profile: {
    firstName: String,
    lastName: String,
    about: String,
    sex: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    profileCreated: {
      type: Boolean,
      default: false
    },
    profileComplete: {
      type: Boolean,
      default: false
    }
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
