const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema for a user account.
 * Represents a registered player in the system with credentials, points, and activity metadata.
 */
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed password
  roles: [{ type: String, default: 'player' }], // user roles like 'player', 'admin'
  pointsBalance: { type: Number, default: 0 }, // total points available to the user
  rewards: [{ type: String }], // identifiers for rewards the user has earned
  isActive: { type: Boolean, default: true },

  // References to related collections
  gameSessions: [{ type: Schema.Types.ObjectId, ref: 'GameSession' }],
  pointsLedger: [{ type: Schema.Types.ObjectId, ref: 'PointsLedger' }],
  payoutRequests: [{ type: Schema.Types.ObjectId, ref: 'PayoutRequest' }],

  // Additional user attributes such as preferences, avatars, etc. can be added here
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
