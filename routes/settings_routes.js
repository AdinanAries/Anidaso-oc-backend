const express = require("express");
const router = express.Router();

// authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    get_oc_server_settings,
    get_cust_app_server_settings,
    addOcServerSettings,
    addCustAppServerSettings
} = require("../controllers/settings_controller");

// routes
router.post("/create/", protect, addOcServerSettings);
router.get("/:property", protect, get_oc_server_settings);
router.post("/customer-app/create/", protect, addCustAppServerSettings);
router.get("/customer-app/:property", protect, get_cust_app_server_settings);


module.exports = router;