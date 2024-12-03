const express = require("express");
const router = express.Router();
const { addReservation, getReservations, getReservationDetails} = require("../controllers/meeting/reservation.controller");
const  jwtMiddleware = require("../middleware/authMiddleware"); 

// /api/reservations
router.post("/", jwtMiddleware,addReservation);

// 특정 예약 조회
// /api/reservations:id
router.get("/:id", jwtMiddleware, getReservationDetails);


module.exports = router;