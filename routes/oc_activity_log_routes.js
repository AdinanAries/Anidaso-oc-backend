const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const {
    getActivityLogsByUserId,
    addActivityLog,
} = require("../controllers/oc_activity_log_controller");

router.get("/all/:user_id/:offset/:limit", protect, getActivityLogsByUserId);
router.post("/log/", protect, addActivityLog);

module.exports = router;