const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const travelDealPackageSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    type: { // ["1 => Package", "2 => Deal"]
        type: Number,
        required: [true, "Please add item type (Package or Deal)"]
    },
    view_template: { // Template for viewing this package on the published page for customers
        type: String,
        required: [true, "Please add view template"],
    }, 
    view_theme: { // Color Theme of Template for viewing this package on the published page for customers
        type: String,
        required: [true, "Please add view template theme"],
    },
    title: {
        type: String,
        required: [true, "Please add customer last name"],
    },
    total_price: {
        type: Number,
        required: [true, "Please add total price"],
    },
    price_currency: {
        type: String,
        required: [true, "Please add price currency"],
    },
    travel_destination: {
        type: String,
        required: [true, "Please add customer last name"],
    },
    start_date: {
        type: String,
        required: [true, "Please add start date"],
    },
    end_date: {
        type: String,
        required: [true, "Please add end date"],
    },
    include_adults: {
        type: Boolean,
        required: [true, "Please add include adults field"],
    },
    include_children: {
        type: Boolean,
        required: [true, "Please add include children field"],
    },
    include_infants: {
        type: Boolean,
        required: [true, "Please add include infants field"],
    },
    max_num_of_adults: {
        type: Number,
        required: [true, "Please add max number of adults field"],
    },
    max_num_of_children: {
        type: Number,
        required: [true, "Please add max number of children field"],
    },
    max_num_of_infants: {
        type: Number,
        required: [true, "Please add max number of infants field"],
    },
    cover_picture: {
        type: String,
        required: [true, "Please add cover photo url"],
    },
    html_description: {
        type: String,
        required: [true, "Please add html description field"],
    },
    text_editor_content: {
        type: Object,
        required: [true, "Please add text editor content field"],
    },
    items: {
        type: Array,
        required: [true, "Please add package items"],
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    }
},
{
    timestamps: true
});

module.exports = travelDealPackageSchema;