const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyInfoSchema = new Schema({
    business_name: {
        type: "String",
        required: [true, "Please add business name"]
    },
    logo_url: {
        type: String,
        required: false,
    },
    business_email: {
        type: String,
        required: [true, "Please add business email"],
    },
    business_phone: {
        type: String,
        required: [true, "Please add business phone"],
    },
    business_facebook_link: {
        type: String,
        required: false,
    },
    business_twitter_link: {
        type: String,
        required: false,
    },
    business_instagram_link: {
        type: String,
        required: false,
    },
},
{
    timestamps: true
});

module.exports = companyInfoSchema;