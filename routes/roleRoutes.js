const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { 
    getUserRoles,
    getUserRoleByConstant,
    getRolePrivilege,
    getAppPages,
    getAppResources,
    getAppResourceType,
    getCanActionsByResourceType,
    CreateNewPrivilege,
    CreateNewAppRole,
    UpdatePrivilege,
    UpdateAppRole,
    getAllRolePrivileges,
} = require("../controllers/roles_controller");

router.get("/", protect, getUserRoles);
router.post("/create/", protect, CreateNewAppRole);
router.put("/edit/", protect, UpdateAppRole);
router.get("/:role_constant", protect, getUserRoleByConstant);
router.get("/privilege/all/privs/", protect, getAllRolePrivileges);
router.get("/privilege/:id", protect, getRolePrivilege);
router.get("/pages/all/", protect, getAppPages);
router.get("/resources/all/", protect, getAppResources);
router.get("/resource-type/:id", protect, getAppResourceType);
router.get("/can-actions/:resource_type_id", protect, getCanActionsByResourceType);
router.post("/privilege/create/", protect, CreateNewPrivilege);
router.put("/privilege/edit/", protect, UpdatePrivilege)

module.exports = router;