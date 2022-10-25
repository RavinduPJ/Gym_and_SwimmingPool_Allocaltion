const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


//Routes

//timeslots--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//insert time slots
app.post("/inserttimeslots", (req, res) => {

    const {
        timeslot_value
    } = req.body;
    try {
        const timeslots = pool.query("INSERT INTO timeslots(timeslot_value) VALUEs ($1) RETURNING *", [timeslot_value]);
        console.log(timeslots);
        res.status(200).send({timeslots});
    } catch (error) {
        console.log(error);
    }
})
//get all time slots
app.get("/getalltimeslots", async (req, res) => {
    try {
        const timeslots = await pool.query("SELECT * FROM timeslots");
        res.json(timeslots.rows);
    } catch (error) {
        console.log(error.message);
    }
})

//department ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//add department
app.post("/adddepartment", (req, res) => {
    const {
        department
    } = req.body;
    
    try {
        const result = pool.query("INSERT INTO department (dept_name) VALUES ($1)", [department]);
            res.json(result);
            console.log(result);
    } catch (error) {
        console.log(error);
    }
});

//getall departments
    app.get("/getalldepartments", async (req, res) => {
        try {
            const department = await pool.query("SELECT * FROM department");
            res.json(department.rows);
        } catch (error) {
            console.log(error.message);
        }
    })
    
//timeallocation---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//check availability of gym
app.post("/checktimeavailablitygym", async (req, res) => {
    const {
        bookingdate,
        bookingtimslotid
    } = req.body
    try {
        const data = await pool.query("SELECT * FROM gymtimeallocation WHERE date_value = $1 AND timeslot_id = $2 AND user_count = 10 ", [bookingdate, bookingtimslotid]);

        const result = data.rowCount;
        if(result > 0) {
            res.send({status: "not available"});
        } else {
            res.send({status: "available"});
        }
    } catch (error) {
        console.log(error.message)
    }
})


//check availablity of pool
app.post("/checktimeavailablitypool", async (req, res) => {
    const {
        bookingdate,
        bookingtimslotid
    } = req.body
    try {
        const data = await pool.query("SELECT * FROM pooltimeallocation WHERE date_value = $1 AND timeslot_id = $2 AND user_count = 10 ", [bookingdate, bookingtimslotid]);

        const result = data.rowCount;
        if(result > 0) {
            res.send({status: "not available"});
        } else {
            res.send({status: "available"});
        }
    } catch (error) {
        console.log(error.message)
    }
})

//add time allocation for gym
app.post("/gymallocatetime", async (req, res) => {
    const { 
        bookingdate,
        //timeslotvalue,//there is an issue with this valiable
        bookingtimslotid,
    } = req.body;

    try {
        const data = await pool.query("SELECT * FROM gymtimeallocation WHERE date_value = $1 AND timeslot_id = $2", [bookingdate, bookingtimslotid])
        if(data.rowCount == 0){
            const insertData = await pool.query("INSERT INTO gymtimeallocation (date_value, timeslot_id, user_count) VALUES ($1, $2, '1') RETURNING *", [bookingdate, bookingtimslotid]);

            res.json(insertData.rows);
        } else {
            const updateCount = await pool.query("UPDATE gymtimeallocation SET user_count = user_count + 1 WHERE date_value = $1 AND timeslot_id = $2 RETURNING *", [bookingdate,bookingtimslotid]);

            res.json(updateCount.rows);
        }
    } catch (error) {
        console.log(error.message);
    }
})


//add time allocation for pool
app.post("/spoolallocatetime", async (req, res) => {
    const { 
        bookingdate,
        //timeslotvalue,//there is an issue with this valiable
        bookingtimslotid,
    } = req.body;

    try {
        const data = await pool.query("SELECT * FROM pooltimeallocation WHERE date_value = $1 AND timeslot_id = $2", [bookingdate, bookingtimslotid])
        if(data.rowCount == 0){
            const insertData = await pool.query("INSERT INTO pooltimeallocation (date_value, timeslot_id, user_count) VALUES ($1, $2, '1') RETURNING *", [bookingdate, bookingtimslotid]);

            res.json(insertData.rows);
        } else {
            const updateCount = await pool.query("UPDATE pooltimeallocation SET user_count = user_count + 1 WHERE date_value = $1 AND timeslot_id = $2 RETURNING *", [bookingdate,bookingtimslotid]);

            res.json(updateCount.rows);
        }
    } catch (error) {
        console.log(error.message);
    }
})

//userdetails------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//add gym user details

app.post("/addgymuser", async (req, res) => {

    const {
        username,
        email,
        epfnumber,
        dept_id,
        bookingdate,
        bookingtimslotid
    } = req.body;

    const result = await pool.query("INSERT INTO user_details (username, email, epfnumber, dpt_id, bookingdate, bookingtimeslotid, bookingplace) VALUES ($1, $2, $3, $4, $5, $6, 'G') RETURNING *", [username, email, epfnumber, dept_id, bookingdate, bookingtimslotid]);
    if(result){
        res.json(result);
    } else {
        res.status(400).send({status: "error"});
    }

});

//add spool user details

app.post("/addspooluser", async (req, res) => {

    const {
        username,
        email,
        epfnumber,
        dept_id,
        bookingdate,
        bookingtimslotid
    } = req.body;

    const result = await pool.query("INSERT INTO user_details VALUES ($1, $2, $3, $4, $5, 'SW') RETURNING *", [username, email, epfnumber, dept_id, bookingdate, bookingtimslotid]);
    if(result){
        res.json(result);
    } else {
        res.status(400).send({status: "error"});
    }

})

//get all users in Gym
app.get("/getallingym", async (req, res) => {

    const result = await pool.query("SELECT a.username, a.email, a.epfnumber, b.timeslot_value, c.dept_name, (a.bookingdate + 1) AS bookingdate FROM user_details a, timeslots b, department c WHERE a.dpt_id = c.dept_id AND a.bookingtimeslotid = b.timeslot_id AND a.bookingplace = 'G'");

    if(result){
        res.json(result.rows);
    } else {
        res.status(400).send({status: "error"});
    }
})

//get all users in SP
app.get("/getallinspool", async (req, res) => {

    const result = await pool.query("SELECT a.username, a.email, a.epfnumber, b.timeslot_value, c.dept_name, (a.bookingdate + 1) AS bookingdate FROM user_details a, timeslots b, department c WHERE a.dpt_id = c.dept_id AND a.bookingtimeslotid = b.timeslot_id AND a.bookingplace = 'SP'");

    if(result){
        res.json(result.rows);
    } else {
        res.status(400).send({status: "error"});
    }
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
})