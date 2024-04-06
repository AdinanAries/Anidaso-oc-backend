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
var bookings_data = require("./models/bookings_log_model");

app.get("/get-recent-bookings/:offset/:limit", async (req, res, next) => {

    let offset = parseInt(req.params.offset);
    --offset; //offset starts from 0 as of array indexes
    let limit = parseInt(req.params.limit);

    console.log(offset);
    console.log(limit);

    //add some code here
    let bookings = await bookings_data.find({}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
        console.log(err);
        res.send([]);
    });
    //let hotel_bookings = await booked_flight_data.find({});
    //let recent_bookings = [...flight_bookings, ...hotel_bookings];
    
    //res.send({booking: ["one", "two", "three"]})
    res.send(bookings);

});

app.get("/get-booking-by-confirmation-number/:reference", async (req, res, next)=>{
    
    let reference = req.params.reference;
    console.log(reference);

    let booking = await bookings_data.find({
        "booking_data.data.associatedRecords.reference": reference
    }).catch(err => {
        console.log(err);
        res.send([]);
    });

    res.send(booking);
});

app.get("/get-booking-by-id/:id", async (req, res, next) => {
    let id = req.params.id;
    let booking = await bookings_data.findById(id);
    res.send(booking);
});

app.post("/search-booked-flight/", async (req, res, next) => {

    console.log(req.body);

    let email = req.body.email;
    let departureDate = req.body.departureDate;
    let returnDate = req.body.returnDate;
    let origin = req.body.origin;
    let destination = req.body.destination;

    console.log("email", email);
    console.log("departureDate", departureDate);
    console.log("returnDate", returnDate);
    console.log("origin", origin);
    console.log("destination", destination);

    let bookings;

    if(email !== '' && departureDate === '' && returnDate === '' && origin === '' && destination === ''){
        
        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.travelers.contact.emailAddress": email
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

    }else if(email === '' && departureDate !== '' && returnDate === '' && origin === '' && destination === ''){
        
        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.flightOffers.itineraries.segments.departure.at": {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

    }else if(email === '' && departureDate === '' && returnDate === '' && origin !== '' && destination === ''){
        
        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.flightOffers.itineraries.segments.departure.iataCode": origin,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(email === '' && departureDate === '' && returnDate === '' && origin === '' && destination !== ''){

        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.flightOffers.itineraries.segments.arrival.iataCode": destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(email !== '' && departureDate !== '' && returnDate === '' && origin === '' && destination === ''){
        
        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.travelers.contact.emailAddress": email,
            "booking_data.data.flightOffers.itineraries.segments.departure.at": {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(email !== '' && departureDate === '' && returnDate === '' && origin !== '' && destination === ''){

        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.travelers.contact.emailAddress": email,
            "booking_data.data.flightOffers.itineraries.segments.departure.iataCode": origin,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(email !== '' && departureDate === '' && returnDate === '' && origin === '' && destination !== ''){

        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.travelers.contact.emailAddress": email,
            "booking_data.data.flightOffers.itineraries.segments.arrival.iataCode": destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else{

        bookings = await bookings_data.find({
            booking_type: "flight",
            "booking_data.data.travelers.contact.emailAddress": email,
            "booking_data.data.flightOffers.itineraries.segments.departure.iataCode": origin,
            "booking_data.data.flightOffers.itineraries.segments.arrival.iataCode": destination,
            "booking_data.data.flightOffers.itineraries.segments.departure.at": departureDate,
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

    }

    res.send(bookings);

});

app.post("/search-booked-hotel/", async (req, res, next) => {

    console.log(req.body);
    res.send(["one", "two", "three", "four"]);

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

app.get("/get-notifications/:skip/:limit", (req, res, next) => {
    //get notifications from database here
    console.log("notifications skip: ", req.params.skip);
    console.log("notifications limit: ", req.params.limit);
    res.send(["one", "two", "three", "four"]);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`app started on ${PORT}`);
})