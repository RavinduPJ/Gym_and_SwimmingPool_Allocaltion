const mongoose = require('mongoose');

const TimeSlotSchema = mongoose.Schema({
    
    SlotId : {
        type: Number,
        required: true
    },
    TimeSlot : {
        type: String,
        required: true
    }
});

const TimeSlot = mongoose.model("TimeSlots", TimeSlotSchema);
module.exports = TimeSlot;