const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingLinkSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    client_app_url: {
        type: String,
        required: [true, "Please add client app url"]
    },
    product: {
        type: String,
        required: [true, "Please add product: 0=>flights, 1=>Hotels, Cars=>2"],
    },
    trip_type: {
        type: String,
        required: [true, "Please add trip type: one-way, round-trip"],
    },
    departure_airport: {
        type: String,
        required: [true, "Please add departure airport"],
    },
    destination_airport: {
        type: String,
        required: [true, "Please add destination airport"],
    },
    travel_dates: {
        type: String,
        required: [true, "Please add travel date(s)"],
    },
    cabin: {
        type: String,
        required: [true, "Please add cabin: economy, premium, business, first"],
    },
    num_of_adults: {
        type: Number,
        required: [true, "Please add number of adults"],
    },
    num_of_children: {
        type: Number,
        required: [true, "Please add number of children"],
    },
    num_of_infants: {
        type: Number,
        required: [true, "Please add number of infants"],
    },
    data_provider: {
        type: String,
        required: [true, "Please add data provider"],
    },
    profit_type: {
        type: String,
        required: [true, "Please add profit type: markup-percentage, flat-rate"],
    },
    profit_type_value: {
        type: String,
        required: [true, "Please add profit type value"],
    },
    visited: {
        type: Number,
        required: false,
    },
    booked: {
        type: Number,
        required: false,
    },
},
{
    timestamps: true
});

module.exports = bookingLinkSchema;