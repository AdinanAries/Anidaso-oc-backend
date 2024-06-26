//models
const {
    BookingHistory,
    BookingIntentLog
} = require("../mongo_db_connections");

const get_recent_bookings = async (req, res, next) => {

    let offset = parseInt(req.params.offset);
    --offset; //offset starts from 0 as of array indexes
    let limit = parseInt(req.params.limit);

    let total_items = await BookingHistory.count({}).catch(err => {
        console.log(err);
        res.send([]);
    });

    res.set("Pagination-Total-Items", total_items);

    let bookings = await BookingHistory.find({}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
        console.log(err);
        res.send([]);
    });
    
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

    let offset = parseInt(req.params.offset);
    --offset; //offset starts from 0 as of array indexes
    let limit = parseInt(req.params.limit);

    let email = req.body.email.trim();
    let departureDate = req.body.departureDate.trim();
    let returnDate = req.body.returnDate.trim();
    let origin = req.body.origin.trim();
    let destination = req.body.destination.trim();

    let total_items = 0;

    let bookings;

    if(
        email
        && !departureDate 
        && !returnDate
        && !origin
        && !destination
    ){
        total_items = await BookingHistory.count({
            type: "Flight",
            "travellers.email": email
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
        total_items = await BookingHistory.count({
            type: "Flight",
            departure_date: {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            departure_date: {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
        total_items = await BookingHistory.count({
            type: "Flight",
            takeoff_airport_code: origin,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            takeoff_airport_code: origin,
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
        total_items = await BookingHistory.count({
            type: "Flight",
            destination_airport_code: destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            destination_airport_code: destination,
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(
        email
        && departureDate 
        && !returnDate 
        && !origin
        && !destination
    ){
        total_items = await BookingHistory.count({
            type: "Flight",
            "travellers.email": email,
            departure_date: {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            departure_date: {"$regex": departureDate, "$options": "i"},
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
        total_items = await BookingHistory.count({
            type: "Flight",
            "travellers.email": email,
            takeoff_airport_code: origin,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            takeoff_airport_code: origin,
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
        total_items = await BookingHistory.count({
            type: "Flight",
            "travellers.email": email,
            destination_airport_code: destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            destination_airport_code: destination,
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
        });
        
    }else if(
        origin
        && destination
        && !departureDate 
        && !returnDate
        && !email
    ){
        total_items = await BookingHistory.count({
            type: "Flight",
            takeoff_airport_code: origin,
            destination_airport_code: destination,
        }).catch(err => {
            console.log(err);
            res.send([]);
        });

        bookings = await BookingHistory.find({
            type: "Flight",
            takeoff_airport_code: origin,
            destination_airport_code: destination,
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
        });
    }else{
        total_items = await BookingHistory.count({
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

        bookings = await BookingHistory.find({
            type: "Flight",
            "travellers.email": email,
            takeoff_airport_code: origin,
            destination_airport_code: destination,
            departure_date: departureDate,
            //"booking_data.data.flightOffers.itineraries.segments.departure.at": returnDate
        }).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
        });

    }

    res.set("Pagination-Total-Items", total_items);

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