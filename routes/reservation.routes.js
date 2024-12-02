const express = require("express");
const router = express.Router();
const { addReservation } = require("../controllers/reservation.controller");

// /api/reservations
router.post("/", addReservation);

module.exports = router;