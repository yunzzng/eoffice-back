const express = require("express");
const router = express.Router();
const { addReservation, getReservations, getReservationDetails} = require("../controllers/meeting/reservation.controller");
const  jwtMiddleware = require("../middleware/authMiddleware"); 

// /api/reservations
router.post("/", jwtMiddleware,addReservation);

// /api/reservations/:id
router.get("/:id", jwtMiddleware, getReservationDetails);


module.exports = router;
