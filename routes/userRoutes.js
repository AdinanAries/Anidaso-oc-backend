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
    getUsers,
} = require("../controllers/userController");

router.get("/me/", protect, getUserDetails);
router.get("/:id", protect, getUserDetailsByID);
router.get("/agent/:user_id", protect, getAgentInfo);
router.post("/login/", login);
router.post("/register/", signup);
router.put("/edit/", protect, updateUserDetails);
router.put("/password/edit/", protect, updateUserPassword);
router.get("/all/:offset/:limit", protect, getUsers);

module.exports = router;