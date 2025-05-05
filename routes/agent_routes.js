const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const {
    getAgentInfoSettings,
    addAgentSettings,
    getBasicPublicAgentInfo,
} = require("../controllers/agent_controller");

router.get("/:user_id/:property/", protect, getAgentInfoSettings);
router.get("/public/get-basic-information/:agent_id", getBasicPublicAgentInfo);
router.post("/create/", protect, addAgentSettings);

module.exports = router;