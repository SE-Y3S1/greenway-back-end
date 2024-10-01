const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URI;

mongoose.connect(URL,{
        
        useNewUrlParser: true,

});

const connection = mongoose.connection;
connection.once("open", () => {
console.log("Mongodb connection successfull!");

})

const scheduleRouter = require("./src/api/schedules.js");

app.use("/schedule",scheduleRouter);

app.listen(PORT, () => {
    console.log('server is up and running on port ${PORT}')
})