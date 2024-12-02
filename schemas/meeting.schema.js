const mongoose = require("mongoose");

const MeetingRoomSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    location: { type: String, required: true }, 
    person: { type: Number, required: true }, 
    file: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
});


module.exports = mongoose.model('meetingrooms', MeetingRoomSchema);