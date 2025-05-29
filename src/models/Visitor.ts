import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    index: true
  },
  userAgent: String,
  fingerprint: String,
  lastVisit: {
    type: Date,
    default: Date.now
  },
  visitCount: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for IP and lastVisit
visitorSchema.index({ ip: 1, lastVisit: 1 });

// TTL index to automatically remove old records (30 days)
visitorSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor; 