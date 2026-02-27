const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Schema for a payout request.
 * Represents a user's request to withdraw or redeem points/money.
 */
const payoutRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  requestedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'paid'], default: 'pending' },
  // AI‑managed validation fields
  aiReviewed: { type: Boolean, default: false },
  aiDecision: { type: String, enum: ['approve', 'reject', 'flag'], default: 'flag' },
  aiNotes: { type: String }
});

/**
 * Schema for a payout ledger entry.
 * Records processed payouts along with AI verification.
 */
const payoutLedgerSchema = new Schema({
  requestId: { type: Schema.Types.ObjectId, ref: 'PayoutRequest', required: true },
  processedAt: { type: Date },
  transactionId: { type: String },
  amount: { type: Number, required: true },
  // AI‑managed validation fields
  aiVerified: { type: Boolean, default: false },
  aiReason: { type: String }
});

// Export placeholder models
module.exports = {
  PayoutRequest: mongoose.model('PayoutRequest', payoutRequestSchema),
  PayoutLedger: mongoose.model('PayoutLedger', payoutLedgerSchema)
};
