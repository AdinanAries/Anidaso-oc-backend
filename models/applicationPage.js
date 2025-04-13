const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationPageSchema = new Schema({
    page_title: {
        type: String,
        required: [true, "Please add role description"]
    },
    description: {
        type: String,
        required: [true, "Please add role description"]
    },
    constant: {
        type: Number,
        required: [true, "Please add constant number: 1=>Booking, 2=>Packages&Deals, 3=>Support, 4=>Sales, ..."],
        unique: true,
    },
},
{
    timestamps: true
});

module.exports = applicationPageSchema;