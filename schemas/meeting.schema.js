const mongoose = require('mongoose');

const MeetingRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    personCount: { type: Number, required: true },
    file: { type: String, required: true },
    createdAt: { type: String, default: Date.now },
  },
);

module.exports = mongoose.model('meetingrooms', MeetingRoomSchema);
