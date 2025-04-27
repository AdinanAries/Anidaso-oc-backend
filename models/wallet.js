const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const walletSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    last_top_up_date: {
        type: String,
        required: false,
    },
    current_balance: {
        type: Number,
        required: [true, "Please add current wallet balance"],
    },
},
{
    timestamps: true
});

module.exports = walletSchema;