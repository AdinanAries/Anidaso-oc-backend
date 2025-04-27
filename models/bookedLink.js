const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookedLinkSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    booking_log_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookingHistory',
        required: [true, "Please add logged booking id"]
    },
    booking_link_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookingLink',
        required: [true, "Please add booking link id"]
    },
    link_visit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisitedLink',
        required: [true, "Please add link visit id"]
    },
    wallet_transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wallet',
        required: [true, "Please add wallet transaction id"]
    },
    customer_id: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },
},
{
    timestamps: true
});

module.exports = bookedLinkSchema;