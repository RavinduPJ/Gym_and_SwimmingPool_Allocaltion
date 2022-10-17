const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    UserName : {
        type: String,
        required: true
    },
    EPFNumber : {
        type: Number,
        required: true
    },
    Email : {
        type: String,
        required: true
    },
    BookingDate : {
        type: String, //yyyy-mm-dd
        required: true
    },
    BookingTimeSlot : {
        type: Number,
        required: true
    },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;