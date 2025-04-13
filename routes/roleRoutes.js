const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { 
    getUserRoles,
    getRolePrivilege,
    getAppPages,
    getAppResources,
    getAppResourceType,
    getCanActions
} = require("../controllers/roles_controller");

router.get("/", protect, getUserRoles);
router.get("/privilege/:id", protect, getRolePrivilege);
router.get("/app-pages/", protect, getAppPages);
router.get("/app-resources/", protect, getAppResources);
router.get("/resource-type/:id", protect, getAppResourceType);
router.get("/can-actions/", protect, getCanActions);

module.exports = router;