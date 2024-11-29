const express = require("express");
const router = express.Router();
const { readMinutes, writeMinutes } = require("../controllers/meeting/minutes.controller");

// /api/meeting/minutes
router.post("/minutes", writeMinutes);
 
// /api/meeting/minuteslist
router.get("/minuteslist", readMinutes);

module.exports = router;


