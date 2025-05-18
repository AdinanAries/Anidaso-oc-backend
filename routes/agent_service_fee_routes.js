const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const {
    getAgentServiceFees,
    addAgentServiceFee,
} = require("../controllers/agent_service_fee_controller");

router.get("/agent/all/:oc_user_id", getAgentServiceFees);
router.post("/agent/create/", protect, addAgentServiceFee);

module.exports = router;