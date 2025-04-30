const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletTransactionSchema = new Schema({
    wallet_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: [true, "Please add wallet id"]
    },
    transaction_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WalletTransactionType',
        required: [true, "Please add transaction type id"]
    },
    total_amount: {
        type: Number,
        required: [true, "Please add total transaction amount"],
    },
    total_action_points: {
        type: Number,
        required: [true, "Please add total action points"],
    },
    description: {
        type: String,
        required: [true, "Please add description of transaction"],
    },
    wallet_balance_before: {
        type: Number,
        required: [true, "Please add wallet balance before transaction"],
    }, 
    wallet_balance_after: {
        type: Number,
        required: [true, "Please add wallet balance after transaction"],
    }
},  //////To Do: ADD Wallet Controller and Routs for Wallet, Wallet Transactions, Wallet Transaction Types, Visited Links and Booked Links
{
    timestamps: true
});

module.exports = walletTransactionSchema;