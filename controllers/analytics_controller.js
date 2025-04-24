// models
const {
    BookingHistory,
    BookingIntentLog,
    FailedBookingLog,
    User,
    UserRole,
} = require("../mongo_db_connections");

let CONSTANTS = require("../constants");

const get_total_summeries = async (req, res, next) => {

    const user_id = req.user.id;

    if(!user_id){
        res.status(400);
        res.send({message: "user_id field is required!"});
        return;
    }

    let search_obj = {
        oc_user_id: user_id
    }
    
    // Find User
    const user = await User.findOne({_id: user_id});
    if(!user) {
        res.status(400);
        res.send({message: "User was not found!"});
        return;
    }

    // Get User role
    let usr_role = await UserRole.findOne({_id: user?.role_id});

    if(!usr_role) {
        res.status(400);
        res.send({message: "User role does not exist"});
        return;
    }

    // Check if Admin or Owner - then remove user-id to get all bookings
    const admin_const = CONSTANTS.app_role_constants.admin;
    const owner_const = CONSTANTS.app_role_constants.owner;
    const role_const = usr_role?.constant;
    if(role_const===admin_const || role_const===owner_const){
        search_obj = {};
    }
    
    const Confirmed_Bookings = await BookingHistory.count(search_obj).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Failed_Bookings = await FailedBookingLog.count(search_obj).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Booking_Attempts = await BookingIntentLog.count(search_obj).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Payment_Attempts = await BookingIntentLog.count(search_obj).catch(err => {
        console.log(err);
        res.send([]);
    });
    const Confirmed_Payments = await BookingIntentLog.count({
        ...search_obj,
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