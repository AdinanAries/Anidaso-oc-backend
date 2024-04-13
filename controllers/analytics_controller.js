// models
const {
    BookingHistory,
    BookingIntentLog,
    FailedBookingLog,
} = require("../mongo_db_connections");

const get_total_summeries = async (req, res, next) => {
    const Confirmed_Bookings = await BookingHistory.count({}).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Failed_Bookings = await FailedBookingLog.count({}).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Booking_Attempts = await BookingIntentLog.count({}).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Payment_Attempts = await BookingIntentLog.count({}).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Confirmed_Payments = await BookingIntentLog.count({
        payment_status: "succeeded"
    }).catch(err => {
        console.log(err);
        res.send([]);
    });
    res.send({
        Booking_Attempts,
        Confirmed_Bookings,
        Failed_Bookings,
        Payment_Attempts,
        Confirmed_Payments
    });
}

module.exports = {
    get_total_summeries
}