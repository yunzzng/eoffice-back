const express = require("express");
const router = express.Router();
const  uploadMiddleware = require("../middleware/uploadMiddleware"); 
const { addMeetingRoom, getMeetingRooms, getMeetingRoomById, editMeetingRoom, removeMeetingRoom  } = require("../controllers/meeting/meeting.controller");
const  jwtMiddleware = require("../middleware/authMiddleware"); 

// /api/meeting/meetingrooms
router.post("/", jwtMiddleware, uploadMiddleware.single("file"), addMeetingRoom); 

// /api/meeting/meetingrooms/list
router.get("/list", jwtMiddleware, getMeetingRooms); 

// /api/meeting/meetingrooms/:id 
router.get("/:id", jwtMiddleware, getMeetingRoomById);

// /api/meeting/meetingrooms/:id
router.put("/:id", jwtMiddleware, uploadMiddleware.single("file"), editMeetingRoom);

// /api/meeting/meetingrooms/:id
router.delete("/:id", jwtMiddleware, removeMeetingRoom);

module.exports = router;