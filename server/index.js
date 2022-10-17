const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false
});

//routes
app.use("/user", require("./routes/userRoutes"));
app.use("/timeslot", require("./routes/timeSlotRoutes"));
app.use("/timeallocation", require("./routes/timeAllocationRoutes"));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongo DB Connencted.");
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})