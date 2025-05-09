const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// For Caching current rates to help compare data providers' prices
const cachedRatesSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    product_type: {
        type: String,
        required: [true, "Please add product type eg. Flight, Hotel, Rental Cars, etc."]
    },
    data_provider: {
        type: String,
        required: [true, "Please add data provider eg. Duffel, Amadeus, Saber, etc."],
    },
    departure: {
        type: String,
        required: [true, "Please add departure airport or city."],
    },
    destination: {
        type: String,
        required: [true, "Please add destination airport or city."],
    },
    trip_type: {
        type: String,
        required: false,
    },
    cabin_type: {
        type: String,
        required: false,
    },
    number_of_adults: {
        type: Number,
        required: false,
    },
    number_of_children: {
        type: Number,
        required: false,
    },
    number_of_infants: {
        type: Number,
        required: false,
    },
    current_price: {
        type: Number,
        required: [true, "Please add current price"]
    },
    price_currency: {
        type: Number,
        required: [true, "Please add price currency"]
    }
},
{
    timestamps: true
});

module.exports = cachedRatesSchema;