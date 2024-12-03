const express = require("express");
const router = express.Router();
const { readMinutes, writeMinutes } = require("../controllers/meeting/minutes.controller");
const  jwtMiddleware = require("../middleware/authMiddleware"); 

// /api/meeting/minutes
router.post("/",jwtMiddleware, writeMinutes);

// /api/meeting/minutes/list
router.get("/list", jwtMiddleware,readMinutes);

module.exports = router;