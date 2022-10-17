const express = require('express');
const router = express.Router();

const { 
    addTimeSlots 
} = require('../controllers/timeSlotController');

//add time slot
router.post("/api/addtimeslot", addTimeSlots);


module.exports = router;