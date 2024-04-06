const mongoose = require("mongoose");
require("mongoose-type-url");

let bookings_log_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
    },
    booking_type: {
        type: String
    },
    booking_date: {
        type: String
    },
    is_anidaso_client_user_id: {
        type: String
    },
    booking_data: {
        type: Object
    }
});

module.exports = new mongoose.model("bookings_log", bookings_log_schema);