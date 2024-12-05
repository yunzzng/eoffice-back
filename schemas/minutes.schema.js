const mongoose = require('mongoose');

const MinutesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true  },
    attendees: { type: Number, required: true },
    content: { type: String, required: true },
    createdAt: { type: String, default: Date.now },
  },
);

module.exports = mongoose.model('minutes', MinutesSchema);
