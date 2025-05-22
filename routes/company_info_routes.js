const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    add_company,
    get_company_id,
    update_company,
} = require("../controllers/company_info_controller");

// routes
router.get("/one/:id", protect, get_company_id);
router.post("/create/", protect, add_company);
router.put("/edit/", protect, update_company);

module.exports = router;