const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Lookup Table
const applicationResourceTypeSchema = new Schema({
    resource_type_title: {
        type: String,
        required: [true, "Please add role title"]
    },
    description: {
        type: String,
        required: [true, "Please add role description"]
    },
    constant: { // Constants for matching privilege actions with resources
        type: Number,
        required: [true, "Please add constant number: 1=>Accounts, 2=>Form, 3=>Analytics, ..."],
        unique: true,
    }
},
{
    timestamps: true
});

module.exports = applicationResourceTypeSchema;