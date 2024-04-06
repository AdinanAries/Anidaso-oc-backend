const { response } = require("express");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// For parsing application/json 
app.use(express.json()); 
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/bookings", require("./routes/booking_routes"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`app started on ${PORT}`);
})