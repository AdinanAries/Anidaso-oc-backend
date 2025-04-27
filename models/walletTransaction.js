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
    }
},
{
    timestamps: true
});

module.exports = walletTransactionSchema;