const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    add_travel_deal_package,
    get_travel_deal_packages,
    search_travel_deal_package,
} = require("../controllers/travel_deal_package_controller");

// routes
router.post("/all/:oc_user_id/:offset/:limit", protect, get_travel_deal_packages);
router.get("/search/:oc_user_id/:offset/:limit/:query", protect, search_travel_deal_package);
router.post("/create/", protect, add_travel_deal_package);

module.exports = router;