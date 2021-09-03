const express = require("express");

const app = express();

app.get("/get-recent-bookings/:id", (req, res, next) => {

});

app.get("/get-booking-by-id/:id", (req, res, next) => {

});

app.post("/search-booked-flight/", (req, res, next) => {

});

app.post("/search-booked-hotel", (req, res, next) => {

});

const PORT = process.env.PORT || 6000;

app.listen(PORT, ()=> {
    console.log(`app started on ${PORT}`);
})