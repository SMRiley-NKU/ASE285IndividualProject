const mongoose = require('mongoose');
// Define a schema for storing encrypted passwords
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      hashedPassword: {
        type: String,
        required: true
      }
    });

  module.exports = mongoose.models.User || mongoose.model('User', userSchema);