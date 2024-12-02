const express = require("express");
const router = express.Router();
const { readMinutes, writeMinutes } = require("../controllers/meeting/minutes.controller");

// /api/meeting/minutes
router.post("/", writeMinutes);

// /api/meeting/minutes/list
router.get("/list", readMinutes);

module.exports = router;