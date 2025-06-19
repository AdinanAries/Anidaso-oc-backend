const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    add_service_plan_tier,
    get_service_plan_tiers,
    update_service_plan_tier,
} = require("../controllers/service_plan_controller");

// routes
router.get("/all/", protect, get_service_plan_tiers);
router.post("/create/", protect, add_service_plan_tier);
router.put("/edit/", protect, update_service_plan_tier);

module.exports = router;