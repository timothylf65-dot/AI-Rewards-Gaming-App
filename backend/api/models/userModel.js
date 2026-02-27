const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // Add more user fields such as password, rewards, etc.
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
