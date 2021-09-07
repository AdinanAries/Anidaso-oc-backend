const { response } = require("express");
const express = require("express");
const app = express();
var mongoose = require("mongoose");
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

//mongo db atlass stuff
var mongo_db_url = process.env.MONGO_DB_URL;
mongoose.connect(mongo_db_url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log("connected to database successfully")
});

//models
var booked_flight_data = require("./models/booked_flights_log_model");
var booked_hotel_data = require("./models/booked_hotels_log");

app.get("/get-recent-bookings/:from/:to", (req, res, next) => {
    let pagesstart = req.params.from;
    let pageslast = req.params.to;
    console.log(pagesstart);
    console.log(pageslast);
    //add some code here
    res.send({booking: ["one", "two", "three"]})
});

app.get("/get-booking-by-confirmation-number/:confirmation", async (req, res, next)=>{
    
    /*let confirmation = req.params.confirmation;

    let booking = await booked_flight_data.findOne({
        confirmation: confirmation
    });

    if(!booking){
        booking = await booked_hotel_data.findOne({
            confirmation: confirmation
        });
    }

    res.send(booking);*/
});

app.get("/get-flight-booking-by-id/:id", async (req, res, next) => {
    /*let id = req.params.id;
    let booking = await booked_flight_data.findById(id);
    res.send(booking);*/
});

app.get("/get-hotel-booking-by-id/:id", async (req, res, next) => {
    /*let id = req.params.id;
    let booking = await booked_hotel_data.findById(id);
    res.send(booking);*/
});

app.post("/search-booked-flight/", async (req, res, next) => {

    console.log(req.body);
    res.send(req.body);

    /*let email = req.body.email;
    let departureDate = req.body.departureDate;
    let returnDate = req.body.returnDate;
    let origin = req.body.origin;
    let destination = req.body.destination;

    let booking = await booked_flight_data.findOne({
        email: email,
        departure: departureDate,
        returnDate: returnDate,
        origin: origin,
        destination: destination
    });

    res.send(booking);*/

});

app.post("/search-booked-hotel/", async (req, res, next) => {

    console.log(req.body);
    res.send(req.body);

    /*let email = req.body.email;
    let departureDate = req.body.departureDate;
    let returnDate = req.body.returnDate;
    let origin = req.body.origin;
    let destination = req.body.destination;

    let booking = await booked_hotel_data.findOne({
        email: email,
        departure: departureDate,
        returnDate: returnDate,
        origin: origin,
        destination: destination
    });

    res.send(booking);*/

});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`app started on ${PORT}`);
})