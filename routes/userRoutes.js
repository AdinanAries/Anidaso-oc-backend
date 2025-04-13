const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// Controllers
const { 
    getUserDetails,
    getUserDetailsByID,
    getAgentInfo,
    login, 
    signup, 
    updateUserDetails, 
    updateUserPassword,
} = require("../controllers/userController");

router.get("/me/", protect, getUserDetails);
router.get("/:id", protect, getUserDetailsByID);
router.get("/agent/:user_id", protect, getAgentInfo);
router.post("/login/", login);
router.post("/register/", signup);
router.put("/edit/", protect, updateUserDetails);
router.put("/edit/password", protect, updateUserPassword);

module.exports = router;