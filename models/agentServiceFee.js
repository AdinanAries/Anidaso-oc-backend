const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agentServiceFeeSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: Number,
        required: [true, "Please add product field"],
    },
    name: {
        type: String,
        required: [true, "Please add name field"],
    },
    price: {
        type: Number,
        required: [true, "Please add price field"],
    },
    enabled: {
        type: Boolean,
        required: [true, "Please add enabled field"],
    },
    deleted: {
        type: Boolean,
        required: false,
    }
},
{
    timestamps: true
});

module.exports = agentServiceFeeSchema;