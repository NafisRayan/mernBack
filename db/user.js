const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  threed: { 
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

UserSchema.pre('save', function(next) {
  if (!this.threed) {
    this.threed = {};
  }
  
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;