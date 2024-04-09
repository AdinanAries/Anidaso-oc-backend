const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

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
router.get("/get-recent/:offset/:limit", protect, get_recent_bookings);
router.get("/get-by-reference-number/:reference", protect, get_booking_by_reference_number);
router.get("/get-by-id/:id", protect, get_booking_by_id);
router.get("/get-booking-intent/:order_id", protect, get_booking_intent);
router.post("/search/", protect, search_booked_flight);
router.post("/search-hotel/", protect, search_booked_hotel);

module.exports = router;
