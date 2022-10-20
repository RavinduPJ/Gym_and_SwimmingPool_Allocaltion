const timeSlot = require('../models/TimeSlot');

//Add time slots
const addTimeSlots = (req, res) => {
    const {
        SlotId,
        TimeSlot
    } = req.body;

    const newTimeSlot = new timeSlot({
        SlotId,
        TimeSlot
    });
    
    newTimeSlot.save()
        .then((timeslot) => {
            res.status(200).send({status: "New Time Slot Added", timeslot});
        }).catch((err) => {
            res.status(400).send({status: "Cannot Add Time slot"});
            console.log(err);
        })
}


const getAllTimeSlots = async (req, res) => {
    await timeSlot.find()
        .then((timeSlots) => {
            res.status(200).send({status: "got all the time slots", timeSlots})
        }).catch((err) => {
            res.status(400).send({err});
        })
}



module.exports = {
    addTimeSlots,
    getAllTimeSlots
};