const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Look-up Table
const servicePlanTierInfoSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please add Tier plan name"]
    },
    price: {
        type: Number,
        required: [true, "Please add price"],
    },
    description: {
        type: String,
        required: [true, "Please add Tier plan name"]
    },
    actions_per_unit: {
        type: Number,
        required: [true, "please add actions per unit"]
    },
    total_customers_allowed: {
        type: Number,
        required: [true, "please add total customers allowed"]
    },
    number_of_suppliers_allowed: {
        type: Number,
        required: [true, "please add number of suppliers allowed"]
    },
    other_parameters: {
        type: Array,
        required: false,
    },
    currency: {
        type: String,
        required: [true, "please add price currency"]
    },
    constant: { // Constants for matching privilege actions with resources
        type: Number,
        required: [true, "Please add constant number: 1=>Free Tier, 2=>Basic, 3=>Advanced Tier, ..."],
        unique: true,
    },
},
{
    timestamps: true
});

module.exports = servicePlanTierInfoSchema;