const express = require('express');
const router = express.Router();

const { 
    addTimeAllocation,
    checkAvailablity 
} = require('../controllers/timeAllocationConroller');

//time allocation
router.post("/api/addtimeallocation", addTimeAllocation);

//check time availablity
router.post("/api/checktimeavailablity", checkAvailablity);


module.exports = router;