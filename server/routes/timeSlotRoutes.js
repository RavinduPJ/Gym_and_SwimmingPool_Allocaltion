const express = require('express');
const router = express.Router();

const { 
    addTimeSlots,
    getAllTimeSlots 
} = require('../controllers/timeSlotController');

//add time slot
router.post("/api/addtimeslot", addTimeSlots);

//get all time slots
router.get("/api/gettimeslots", getAllTimeSlots)

module.exports = router;