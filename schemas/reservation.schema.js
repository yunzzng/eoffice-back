const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meetingRoom',
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  personCount: { type: Number, required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('reservation', ReservationSchema);
