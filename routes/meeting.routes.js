const express = require("express");
const router = express.Router();
const  uploadMiddleware = require("../middleware/uploadMiddleware"); 
const { addMeetingRoom, getMeetingRooms } = require("../controllers/meeting/meeting.controller");

// /api/meeting/meetingrooms
router.post("/", uploadMiddleware.single("file"), addMeetingRoom); 

// /api/meeting/meetingrooms/list
router.get("/list", getMeetingRooms); 

module.exports = router;