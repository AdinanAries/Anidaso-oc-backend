const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    first_name: {
        type: String,
        required: [true, "Please add customer first name"],
    },
    last_name: {
        type: String,
        required: [true, "Please add customer last name"],
    },
    email: {
        type: String,
        required: [true, "Please add customer email"],
    },
    phone: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: false,
    },
    gender: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    zip_code: {
        type: String,
        required: false,
    },
},
{
    timestamps: true
});

module.exports = customerSchema;