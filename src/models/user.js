const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    nombre: { type: String },
  },
  {
    collection: 'users',
    versionKey: false,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);