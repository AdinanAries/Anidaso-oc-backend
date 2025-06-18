const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    get_all_sales,
    get_monthly_sales,
} = require("../controllers/sales_controller");

// routes
router.post("/all/:oc_user_id/:offset/:limit", protect, get_all_sales);
router.post("/group/monthly/:oc_user_id", protect, get_monthly_sales);

module.exports = router;