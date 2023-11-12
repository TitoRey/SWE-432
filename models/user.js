const mongoose = require('mongoose');
const roles = { 
  listener: 0,
  dj: 1,
  admin: 2
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }, 
  password: { 
    type: String,
    required: true
  },
  name: { 
    type: String, 
    required: true
  },
  role: { 
    type: Number,
    required: true,
    default: roles['listener']
  }
})

module.exports = mongoose.model('User', userSchema);