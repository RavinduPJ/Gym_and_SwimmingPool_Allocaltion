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


const deleteResevation = async (req, res) => {
    const id = req.params.id;

    await User.findByIdAndDelete()
        .then(() => {
            res.status(200).send({status: "Resevation has been canceled"});
        }).catch((err) =>{
            res.status(400).send({err});
        })
}


module.exports = {
    addUserResevation,
    deleteResevation
}