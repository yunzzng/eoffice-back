const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meetingRoom',
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  participants: { type: String, required: true },
  title: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});

module.exports = mongoose.model('reservation', ReservationSchema);


