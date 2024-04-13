const express = require("express");
const router = express.Router();

// authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    get_total_summeries
} = require("../controllers/analytics_controller");

// routes
router.get("/totals-summary/", protect, get_total_summeries);

module.exports = router;