const User = require('../models/UserDetaisl');

//Add user resevation
const addUserResevation = async(req, res) => {

    const {
        UserName,
        EPFNumber,
        Email,
        BookingDate,
        BookingTimeSlot,
    } = req.body;

    const newUser = new User ({
        UserName,
        EPFNumber,
        Email,
        BookingDate,
        BookingTimeSlot,
    });

    newUser.save()
        .then((customer) => {
            res.status(201).send({status: "User Added", customer});
            console.log("User Added");
        }).catch((err) => {
            res.status(400);
            console.log(err);
        })
}



module.exports = {
    addUserResevation
}