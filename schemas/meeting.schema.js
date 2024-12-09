const mongoose = require('mongoose');

const MeetingRoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    personCount: { type: Number, required: true },
    file: { type: String, required: true },
    status: { type: String, default: 'available'},
    createdAt: { type: String, default: Date.now },
  },
);

module.exports = mongoose.model('meetingrooms', MeetingRoomSchema);
