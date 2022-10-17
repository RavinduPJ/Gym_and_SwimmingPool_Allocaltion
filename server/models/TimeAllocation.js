const mongoose = require('mongoose');

const TimeAllocationSchema = new mongoose.Schema({

    Date : {
        type: String,
        required: true
    },
    TimeSlotId : {
        type: Number,
        required: true
    },
    Count : {
        type: Number,
        required: true
    }
});

const TimeAllocation = mongoose.model("timeAllocation", TimeAllocationSchema);
module.exports = TimeAllocation;