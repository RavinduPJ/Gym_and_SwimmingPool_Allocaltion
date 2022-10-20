const express = require('express');
const router = express.Router();

const { 
    addTimeAllocation 
} = require('../controllers/timeAllocationConroller');

//time allocation
router.post("/api/addtimeallocation", addTimeAllocation);


module.exports = router;