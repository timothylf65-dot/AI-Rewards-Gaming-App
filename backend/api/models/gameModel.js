const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema for a game definition.
 * Represents a game available in the platform with metadata and reward mechanics.
 */
const gameSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  genre: { type: String },
  rewardMultiplier: { type: Number, default: 1 }, // multiplier for points earned in this game
  isActive: { type: Boolean, default: true },
  // Additional fields like difficulty levels, rules, etc. can be added here
}, { timestamps: true });

/**
 * Schema for a game session.
 * Represents a single session where a user plays a game, tracking progress and AI validation.
 */
const gameSessionSchema = new Schema({
  sessionId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  pointsEarned: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  // AI-managed validation fields
  aiReviewed: { type: Boolean, default: false },
  aiNotes: { type: String },
  // Additional session-specific fields can go here
}, { timestamps: true });

/**
 * Schema for a points ledger entry.
 * Records the flow of points to and from a user's account along with AI validation.
 */
const pointsLedgerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: Schema.Types.ObjectId, ref: 'GameSession' },
  pointsChange: { type: Number, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  // AI-managed validation fields
  aiVerified: { type: Boolean, default: false },
  aiReason: { type: String },
  // Additional ledger-specific fields can be added here
}, { timestamps: true });

// Export placeholder models
module.exports = {
  Game: mongoose.model('Game', gameSchema),
  GameSession: mongoose.model('GameSession', gameSessionSchema),
  PointsLedger: mongoose.model('PointsLedger', pointsLedgerSchema)
};
