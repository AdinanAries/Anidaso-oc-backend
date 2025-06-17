const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    create_subscription,
    create_payment_intent,
    get_stripe_customer_by_email,
    get_stripe_subscriptions_by_customer_id,
} = require("../controllers/payments_controller");

// routes
router.post("/create-subscription/", protect, create_subscription);
router.post("/create-payment-intent/", protect, create_payment_intent);
router.post("/get-customer-from-stripe-by-email/", protect, get_stripe_customer_by_email);
router.post("/get-stripe-subscriptions-by-customer-id/", protect, get_stripe_subscriptions_by_customer_id);

module.exports = router;