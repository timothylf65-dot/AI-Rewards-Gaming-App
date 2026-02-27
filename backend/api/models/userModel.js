const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  points: { type: Number, default: 0 },
  rewards: [{ type: String }], // list of reward identifiers the user has earned
  isActive: { type: Boolean, default: true },
  // Additional user attributes like roles, preferences, etc. can be added here
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
