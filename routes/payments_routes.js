const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    create_subscription,
    create_payment_intent,
} = require("../controllers/payments_controller");

// routes
router.post("/create-subscription/", protect, create_subscription);
router.post("/create-payment-intent/", protect, create_payment_intent);

module.exports = router;