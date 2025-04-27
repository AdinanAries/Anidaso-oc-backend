const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    addBookingLink,
    get_agent_booking_links
} = require("../controllers/booking_link_controller");

// routes
router.get("/agent/all/:oc_user_id/:offset/:limit", protect, get_agent_booking_links);
router.post("/create/", protect, addBookingLink);

module.exports = router;