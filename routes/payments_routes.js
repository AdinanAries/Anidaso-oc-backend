const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    create_subscription,
    process_payment,
} = require("../controllers/payments_controller");

// routes
router.post("/create-subscription/", protect, create_subscription);
router.post("/process-payment/", protect, process_payment);

module.exports = router;