const mongoose = require('mongoose');

const MinutesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    attendees: { type: Number, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('minutes', MinutesSchema);
