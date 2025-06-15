const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Lookup Table
const walletTransactionTypeSchema = new Schema({
    type: {
        type: String,
        required: [true, "Please add transaction type: credit, debit"]
    },
    title: {
        type: String,
        required: [true, "Please add transaction type title"]
    },
    unit_cost: {
        type: Number,
        required: [true, "Please add monetary unit cost for this transaction type"],
    },
    unit_action_point: {
        type: Number,
        required: [true, "Please add unit action point for this transaction type"],
    },
    cost_currency: {
        type: String,
        required: [true, "Please add cost currency"],
    },
    constant: { // Constants for matching privilege actions with resources
        type: Number,
        required: [true, "Please add constant number: 1=>Wallet Top-up, 2=>Link Created/Loaded, 3=>Customer Opened Link, ..."],
        unique: true,
    }
},
{
    timestamps: true
});

module.exports = walletTransactionTypeSchema;