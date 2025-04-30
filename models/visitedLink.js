const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const visitedLinkSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    booking_link_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add booking link id"]
    },
    wallet_transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: [true, "Please add wallet transaction id"]
    },
    customer_id: {
        type: String,
        required: false
    },
    info: {
        type: String,
        required: false
    }
},
{
    timestamps: true
});

module.exports = visitedLinkSchema;