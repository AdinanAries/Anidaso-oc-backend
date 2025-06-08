const mongoose = require("mongoose");

// schemas
const bookingHistorySchema = require("./models/bookingHistory");
const bookingIntentLogSchema = require("./models/bookingIntentLog");
const userSchema = require("./models/user");
const ocServerSettingsSchema = require("./models/ocServerSettings");
const failedBookingLogSchema = require("./models/failedBookingLog");
const custAppServerSettingsSchema = require("./models/custAppServerSettings");
const agentInfoSchema = require("./models/agentInfo");
const applicationPageSchema = require("./models/applicationPage");
const rolePrivilegeSchema = require("./models/rolePrivilege");
const applicationResourceSchema = require("./models/applicationResource");
const applicationResourceTypeSchema = require("./models/applicationResourceType");
const canActionSchema = require("./models/canAction");
const userRoleSchema = require("./models/userRole");
const bookingLinkSchema = require("./models/bookingLink");
const walletSchema = require("./models/wallet");
const walletTransactionTypeSchema = require("./models/walletTransactionType");
const walletTransactionSchema = require("./models/walletTransaction");
const visitedLinkSchema = require("./models/visitedLink");
const bookedLinkSchema = require("./models/bookedLink");
const customerSchema = require("./models/customer");
const agentBookingEngineSchema = require("./models/agentBookingEngine");
const companyInfoSchema = require("./models/companyInfo");
const agentServiceFeeSchema = require("./models/agentServiceFee");
const ocActivityLogSchema = require("./models/ocActivityLog");
const newsLetterSchema = require("./models/newsLetter");

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
const AgentInfo = welldugo_oc_conn.model('AgentInfo', agentInfoSchema);
const ApplicationPage = welldugo_oc_conn.model('ApplicationPage', applicationPageSchema);
const RolePrivilege = welldugo_oc_conn.model('RolePrivilege', rolePrivilegeSchema);
const ApplicationResource = welldugo_oc_conn.model('ApplicationResource', applicationResourceSchema);
const ApplicationResourceType = welldugo_oc_conn.model('ApplicationResourceType', applicationResourceTypeSchema);
const CanAction = welldugo_oc_conn.model('CanAction', canActionSchema);
const UserRole = welldugo_oc_conn.model('UserRole', userRoleSchema);
const BookingLink = welldugo_oc_conn.model('BookingLink', bookingLinkSchema);
const Customer = welldugo_oc_conn.model("Customer", customerSchema);
const Wallet = welldugo_oc_conn.model("Wallet", walletSchema);
const WalletTransactionType = welldugo_oc_conn.model("WalletTransactionType", walletTransactionTypeSchema);
const WalletTransaction = welldugo_oc_conn.model("WalletTransaction", walletTransactionSchema);
const VisitedLink = welldugo_oc_conn.model("VisitedLink", visitedLinkSchema);
const BookedLink = welldugo_oc_conn.model("BookedLink", bookedLinkSchema);
const AgentBookingEngine = welldugo_oc_conn.model("AgentBookingEngine", agentBookingEngineSchema);
const CompanyInfo = welldugo_oc_conn.model("CompanyInfo", companyInfoSchema);
const AgentServiceFee = welldugo_oc_conn.model("AgentServiceFee", agentServiceFeeSchema);
const OcActivityLog = welldugo_oc_conn.model("OcActivityLog", ocActivityLogSchema);
const NewsLetter = welldugo_oc_conn.model("NewsLetter", newsLetterSchema);

module.exports = {
    BookingHistory,
    BookingIntentLog,
    User,
    FailedBookingLog,
    CustAppServerSettings,
    OcServerSettings,
    AgentInfo,
    ApplicationPage,
    RolePrivilege,
    ApplicationResource,
    ApplicationResourceType,
    CanAction,
    UserRole,
    BookingLink,
    Customer,
    Wallet,
    WalletTransactionType,
    WalletTransaction,
    VisitedLink,
    BookedLink,
    AgentBookingEngine,
    CompanyInfo,
    AgentServiceFee,
    OcActivityLog,
    NewsLetter,
    // DB params
    DbEnvs: {
        customer: welldugo_db_url,
        oc: welldugo_oc_url
    }
}

