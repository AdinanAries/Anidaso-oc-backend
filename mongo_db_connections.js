const mongoose = require("mongoose");

// schemas
const bookingHistorySchema = require("./models/bookingHistory");
const bookingIntentLogSchema = require("./models/bookingIntentLog");
const userSchema = require("./models/user");
const ocServerSettingsSchema = require("./models/ocServerSettings");
const failedBookingLogSchema = require("./models/failedBookingLog");
const custAppServerSettingsSchema = require("./models/custAppServerSettings");

// mongo connections strings
// to be deleted: const mongo_db_url = process.env.MONGO_DB_URL;
const welldugo_db_url = process.env.WELLDUGO_DB_URL;
const welldugo_oc_url = process.env.WELLDUGO_OC_DB_URL;

// Test DBs
//const welldugo_db_url = process.env.WELLDUGO_TEST_DB_URL;
//const welldugo_oc_url = process.env.WELLDUGO_OC_TEST_DB_URL;

// mongo connections
let welldugo_conn = mongoose.createConnection(welldugo_db_url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("connected to welldugo database successfully")
});
let welldugo_oc_conn = mongoose.createConnection(welldugo_oc_url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("connected to welldugo-oc database successfully")
});

/* to be deleted: mongoose.connect(mongo_db_url, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
  console.log("connected to database successfully")
});*/

// welldugo models
const BookingHistory = welldugo_conn.model('BookingHistory', bookingHistorySchema);
const BookingIntentLog = welldugo_conn.model('BookingIntentLog', bookingIntentLogSchema);
const FailedBookingLog = welldugo_conn.model('FailedBookingLog', failedBookingLogSchema);
const CustAppServerSettings = welldugo_conn.model('CustAppServerSettings', custAppServerSettingsSchema);

//welldugo oc models
const User = welldugo_oc_conn.model('User', userSchema);
const OcServerSettings = welldugo_oc_conn.model("OcServerSettings", ocServerSettingsSchema);

module.exports = {
    BookingHistory,
    BookingIntentLog,
    User,
    FailedBookingLog,
    CustAppServerSettings,
    OcServerSettings,
    // DB params
    DbEnvs: {
        customer: welldugo_db_url,
        oc: welldugo_oc_url
    }
}

