const express = require("express");
var booked_flight_data = require("./models/booked_flights_log_model");
var booked_hotel_data = require("./models/booked_hotels_log");
const app = express();

app.get("/get-recent-bookings/:confirmation", (req, res, next) => {

    let confirmation = req.params.confirmation;

    let booking = await booked_flight_data.findOne({
        confirmation: confirmation
    });

    if(!booking){
        booking = await booked_hotel_data.findOne({
            confirmation: confirmation
        });
    }

    res.send(booking);

});

app.get("/get-booking-by-confirmation-number/", async (req, res, next)=>{

});

app.get("/get-flight-booking-by-id/:id", async (req, res, next) => {
    let id = req.params.id;
    let booking = await booked_flight_data.findById(id);
    res.send(booking);
});

app.get("/get-hotel-booking-by-id/:id", (req, res, next) => {
    let id = req.params.id;
    let booking = await booked_hotel_data.findById(id);
    res.send(booking);
});

app.post("/search-booked-flight/", (req, res, next) => {
    let email = req.body.email;
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

    res.send(booking);
});

app.post("/search-booked-hotel", (req, res, next) => {

});

const PORT = process.env.PORT || 6000;

app.listen(PORT, ()=> {
    console.log(`app started on ${PORT}`);
})