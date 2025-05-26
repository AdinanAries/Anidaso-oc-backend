const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    add_customer,
    get_customers_of_agent,
    search_customer_of_agent,
} = require("../controllers/customer_controller");

// routes
router.post("/agent/all/:oc_user_id/:offset/:limit", protect, get_customers_of_agent);
router.get("/agent/each/:id", protect, search_customer_of_agent);
router.get("/agent/totals/current-month", protect);
router.post("/create/", protect, add_customer);

module.exports = router;