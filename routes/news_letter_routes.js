const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    saveNewsLetter,
    getSavedNewsLetter,
    sendNewsLetterEmail,
} = require("../controllers/news_letter_controller");

// routes
router.get("/:oc_user_id/:template_name", protect, getSavedNewsLetter);
router.post("/save/", protect, saveNewsLetter);
router.post("/send-email/", protect, sendNewsLetterEmail);

module.exports = router;