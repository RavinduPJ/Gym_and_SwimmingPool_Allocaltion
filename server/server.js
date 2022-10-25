const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


//Routes

//test create
app.post("/todo", async (req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1)", [description]
            );
        res.json(newTodo);

    } catch (error) {
        console.log(error.message);
    }
});

//test read
app.get("/read", async (req, res) => {
    try {
        const read = await pool.query("SELECT * FROM todo");
        res.json(read.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// app.use("/api", require('./routes/testRoutes'));

//timeslots
//get all time slots
app.get("/getalltimeslots", async (req, res) => {
    try {
        const timeslots = await pool.query("SELECT * FROM timeslots");
        res.json(timeslots.rows);
    } catch (error) {
        console.log(error.message);
    }
})


//timeallocation
//check
app.post("/checktimeavailablity", async (req, res) => {
    const {
        bookingdate,
        bookingtimslotid
    } = req.body
    try {
        const data = await pool.query("SELECT * FROM timeallocation WHERE date_value = $1 AND timeslot_id = $2 AND user_count = 10 ", [bookingdate, bookingtimslotid]);

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

//add time allocation
app.post("/allocatetime", async (req, res) => {
    const { 
        bookingdate,
        //timeslotvalue,//there is an issue with this valiable
        bookingtimslotid,
    } = req.body;

    try {
        const data = await pool.query("SELECT * FROM timeallocation WHERE date_value = $1 AND timeslot_id = $2", [bookingdate, bookingtimslotid])
        if(data.rowCount == 0){
            const insertData = await pool.query("INSERT INTO timeallocation (date_value, timeslot_id, user_count) VALUES ($1, $2, '1') RETURNING *", [bookingdate, bookingtimslotid]);

            res.json(insertData.rows);
        } else {
            const updateCount = await pool.query("UPDATE timeallocation SET user_count = user_count + 1 WHERE date_value = $1 AND timeslot_id = $2 RETURNING *", [bookingdate,bookingtimslotid]);

            res.json(updateCount.rows);
        }
    } catch (error) {
        console.log(error.message);
    }
})

//userdetails
//add user details

app.post("/adduser", async (req, res) => {

    const {
        username,
        email,
        epfnumber,
        bookingdate,
        bookingtimslotid
    } = req.body;

    const result = await pool.query("INSERT INTO user_details VALUES ($1, $2, $3, $4, $5) RETURNING *", [username, email, epfnumber, bookingdate, bookingtimslotid]);
    if(result){
        res.json(result);
    } else {
        res.status(400).send({status: "error"});
    }

})

//get all users
app.get("/getall", async (req, res) => {

    const result = await pool.query("SELECT a.username, a.email, a.epfnumber, (a.bookingdate + 1) AS bookingdate, b.timeslot_value  FROM user_details a, timeslots b WHERE b.timeslot_id = a.bookingtimeslotid");

    if(result){
        res.json(result.rows);
    } else {
        res.status(400).send({status: "error"});
    }
})

app.listen(5000, () => {
    console.log("server is running on port 5000");
})