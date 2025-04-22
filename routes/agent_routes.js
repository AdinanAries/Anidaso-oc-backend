const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const {
    getAgentInfoSettings,
    addAgentSettings,
} = require("../controllers/agent_controller");

router.get("/:user_id/:property/", protect, getAgentInfoSettings);
router.post("/create/", protect, addAgentSettings);

module.exports = router;