const express = require("express");
const router = express.Router();

// Authentication
const { protect } = require("../middlewares/authMiddleware");

// controllers
const {
    getWalletByID,
    get_transaction_types,
    add_agent_wallet,
    add_transaction_of_agent,
    get_transactions_of_agent,
    add_visited_link_of_agent,
    add_booked_link_of_agent,
    update_agent_wallet
} = require("../controllers/wallet_controller");

// routes
router.get("/agent/transaction/wallet/:id", protect, getWalletByID);
router.post("/agent/create/", protect, add_agent_wallet);
router.post("/agent/update/", protect, update_agent_wallet);
router.post("/agent/transaction/all/:wallet_id/:offset/:limit", protect, get_transactions_of_agent);
router.get("/agent/transaction/type/all/", get_transaction_types);
router.post("/agent/transaction/create/", add_transaction_of_agent);
router.post("/agent/transaction/visited-link/create/", add_visited_link_of_agent);
router.post("/agent/transaction/booked-link/create/", add_booked_link_of_agent);

module.exports = router;