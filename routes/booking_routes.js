const express = require("express");
const router = express.Router();

// controllers
const {
    get_recent_bookings,
    get_booking_by_reference_number,
    get_booking_by_id,
    search_booked_flight,
    search_booked_hotel,
    get_booking_intent,
} = require("../controllers/booking_controller");

// routes
router.get("/get-recent/:offset/:limit", get_recent_bookings);
router.get("/get-by-reference-number/:reference", get_booking_by_reference_number);
router.get("/get-by-id/:id", get_booking_by_id);
router.get("/get-booking-intent/:order_id", get_booking_intent);
router.post("/search/", search_booked_flight);
router.post("/search-hotel/", search_booked_hotel);

module.exports = router;
