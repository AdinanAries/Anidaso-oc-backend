const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    add_customer,
    get_customers_of_agent
} = require("../controllers/customer_controller");

// routes
router.get("/agent/all/:oc_user_id/:offset/:limit", protect, get_customers_of_agent);
router.post("/create/", protect, add_customer);

module.exports = router;