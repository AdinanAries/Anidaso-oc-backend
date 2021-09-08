const mongoose = require("mongoose");
require("mongoose-type-url");

let booked_hotels_log_schema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        reqiured: true,
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

module.exports = new mongoose.model("booked_hotels_log", booked_hotels_log_schema);