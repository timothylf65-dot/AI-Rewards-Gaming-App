const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema for a game session.
 * Represents a single session where a user plays a game,
 * tracking the timing, points earned and AI validation state.
 */
const gameSessionSchema = new Schema({
  sessionId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date },
  pointsEarned: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'completed', 'cancelled'], default: 'active' },
  // AI‑managed validation fields
  aiReviewed: { type: Boolean, default: false },
  aiNotes: { type: String }
});

/**
 * Schema for a points ledger entry.
 * Records the flow of points to and from a user's account along with AI validation.
 */
const pointsLedgerSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  sessionId: { type: String },
  pointsChange: { type: Number, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  // AI‑managed validation fields
  aiVerified: { type: Boolean, default: false },
  aiReason: { type: String }
});

// Export placeholder models
module.exports = {
  GameSession: mongoose.model('GameSession', gameSessionSchema),
  PointsLedger: mongoose.model('PointsLedger', pointsLedgerSchema)
};
