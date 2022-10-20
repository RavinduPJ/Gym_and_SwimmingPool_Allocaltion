const timeAllocation = require('../models/TimeAllocation');

//Add time allocation 
const addTimeAllocation = async (req, res) => {
    
    const {
        Date,
        TimeSlotId 
    } = req.body;

    const count = 1;
    const checkandbook = new timeAllocation({
        Date,
        TimeSlotId,
        Count : count,
    });

    const exist = await timeAllocation.findOne({ Date: Date ,TimeSlotId: TimeSlotId });
    if(exist){
        if(exist.Count < 10) {
            //Update the count
            const count = exist.Count + 1;
            const updateCount = {
                Count : count
            };

            await timeAllocation.findOneAndUpdate({ Date: Date ,TimeSlotId : TimeSlotId }, updateCount)
            .then((update) => {
                res.status(201).send({status: "Count update", update});
            }).catch((err) => {
                res.status(400).send({status: "fail to update", err});
            })
        }else{
            //Send reply that relevant slot is full
            res.status(400).send({status: "Count has reached to maximum"});
        }
    }else {
        //Create a time slot and add count as 1
        checkandbook.save()
            .then((timeallocation) => {
                res.status(200).send({status: "time has allocated", timeallocation});
            }).catch((err) => {
                res.status(400).send({status: "fail to allocate time", err});
            })
    }
}




module.exports = {
    addTimeAllocation
}