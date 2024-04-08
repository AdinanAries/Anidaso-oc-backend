//models
const {
    BookingHistory,
    BookingIntentLog
} = require("../mongo_db_connections");

const get_recent_bookings = async (req, res, next) => {

    let offset = parseInt(req.params.offset);
    --offset; //offset starts from 0 as of array indexes
    let limit = parseInt(req.params.limit);

    console.log(offset);
    console.log(limit);

    //add some code here
    let bookings = await BookingHistory.find({}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
        console.log(err);
        res.send([]);
    });
    //let hotel_bookings = await booked_flight_data.find({});
    //let recent_bookings = [...flight_bookings, ...hotel_bookings];
    
    //res.send({booking: ["one", "two", "three"]})
    res.send(bookings);

}

const get_booking_by_reference_number = async (req, res, next)=>{
    
    let reference = req.params.reference;
    //console.log(reference);

    let booking = await BookingHistory.find({
        "originPayloads.booking_reference": reference
    }).catch(err => {
        console.log(err);
        res.send([]);
    });

    res.send(booking);
}

const get_booking_by_id = async (req, res, next) => {
    let id = req.params.id;
    let booking = await BookingHistory.findById(id);
    res.send(booking);
}

const search_booked_flight = async (req, res, next) => {

    console.log(req.body);

    let email = req.body.email.trim();
    let departureDate = req.body.departureDate.trim();
    let returnDate = req.body.returnDate.trim();
    let origin = req.body.origin.trim();
    let destination = req.body.destination.trim();

    console.log("email", email);
    console.log("departureDate", departureDate);
    console.log("returnDate", returnDate);
    console.log("origin", origin);
    console.log("destination", destination);

    let bookings;

    if(
        email
        && !departureDate 
        && !returnDate
        && !origin
        && !destination
    ){
        
        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

    }else if(
        departureDate
        && !email
        && !returnDate 
        && !origin
        && !destination
    ){
        
        bookings = await BookingHistory.find({
            type: "Flight",
            departure_date: {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

    }else if(
        origin 
        && !email
        && !departureDate 
        && !returnDate
        && !destination
    ){
        
        bookings = await BookingHistory.find({
            type: "Flight",
            takeoff_airport_code: origin,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(
        destination
        && !email
        && !departureDate
        && !returnDate
        && !origin 
    ){

        bookings = await BookingHistory.find({
            type: "Flight",
            destination_airport_code: destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(
        email
        && departureDate 
        && !returnDate 
        && !origin
        && !destination){
        
        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            departure_date: {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(
        email 
        && origin
        && !departureDate 
        && !returnDate
        && !destination
    ){

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            takeoff_airport_code: origin,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(
        email 
        && destination
        && !departureDate 
        && !returnDate
        && !origin
    ){

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            destination_airport_code: destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else{

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            takeoff_airport_code: origin,
            destination_airport_code: destination,
            departure_date: departureDate,
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

    }

    res.send(bookings);

}

const search_booked_hotel = async (req, res, next) => {

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

}

const get_booking_intent = async (req, res, next) => {
    let booking_order_id = req.params.order_id;

    let booking_intent = await BookingIntentLog.findOne({
        "booking_order.id": booking_order_id
    }).catch(err => {
        console.log(err);
        res.send({});
    });

    res.send(booking_intent);  
    
}

module.exports = {
    get_recent_bookings,
    get_booking_by_reference_number,
    get_booking_by_id,
    search_booked_flight,
    search_booked_hotel,
    get_booking_intent,
}