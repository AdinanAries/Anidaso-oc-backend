const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    add_agent_booking_engine,
    get_booking_engine_of_agent
} = require("../controllers/agent_booking_engine_controller");

// routes
router.get("/agent/:oc_user_id", get_booking_engine_of_agent);
router.post("/agent/create/", protect, add_agent_booking_engine);

module.exports = router;