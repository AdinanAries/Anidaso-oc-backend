const express = require("express");
const router = express.Router();

// controllers
const {
    get_notifications,
} = require("../controllers/notifications_controller");

// routes
router.get("/get-notifications/:skip/:limit", get_notifications);

module.exports = router;
