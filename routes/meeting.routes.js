const express = require("express");
const router = express.Router();
const  uploadMiddleware = require("../middleware/uploadMiddleware"); 
const { addMeetingRoom, getMeetingRooms, editMeetingRoom, removeMeetingRoom  } = require("../controllers/meeting/meeting.controller");

// /api/meeting/meetingrooms
router.post("/", uploadMiddleware.single("file"), addMeetingRoom); 

// /api/meeting/meetingrooms/list
router.get("/list", getMeetingRooms); 

// /api/meeting/meetingrooms/:id)
router.put("/:id", uploadMiddleware.single("file"), editMeetingRoom);

// /api/meeting/meetingrooms/:id)
router.delete("/:id", removeMeetingRoom);

module.exports = router;