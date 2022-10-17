const timeSlot = require('../models/TimeSlot');


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



module.exports = {
    addTimeSlots
};