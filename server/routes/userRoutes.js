const express = require('express');
const router = express.Router();

const {
    addUserResevation
} = require('../controllers/userController');

//add resevation
router.post("/api/reservetimeslot", addUserResevation);


module.exports = router;