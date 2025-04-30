const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();

const { 
    DbEnvs,
    CustAppServerSettings,
    OcServerSettings
} = require("./mongo_db_connections");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Use Cors
app.use(cors({
    origin: '*',
    exposedHeaders: ['Content-Length', 'Pagination-Total-Items'],
}));

// For parsing application/json 
app.use(express.json()); 
// For parsing application/x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/bookings", require("./routes/booking_routes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/analytics", require("./routes/analytics_routes"));
app.use("/api/settings", require("./routes/settings_routes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/agents", require("./routes/agent_routes"));
app.use("/api/booking-links", require("./routes/booking_link_routes"));
app.use("/api/wallets", require("./routes/wallet_routes"));
app.use("/api/customers", require("./routes/customers_routes"));

// Local Utilities
const check_is_cust_prod_db = () => {
    if (DbEnvs.customer === process.env.WELLDUGO_DB_URL)
        return true
    else
        return false
}

const check_is_oc_prod_db = () => {
    if (DbEnvs.oc === process.env.WELLDUGO_OC_DB_URL)
        return true
    else
        return false
}

// fallback routes
app.use("/", async (req, res, next)=>{
    let ocSettings = await OcServerSettings.find({}).catch(err => {
        console.log(err);
    });
    let custAppSettings = await CustAppServerSettings.find({}).catch(err => {
        console.log(err);
    });
    res.send({
        ocSettings: ocSettings,
        custAppSettings: custAppSettings,
        isCustProDB: check_is_cust_prod_db(),
        isOCProDB: check_is_oc_prod_db(),
        message: "Welldugo-OC Server Works!!!"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log(`app started on ${PORT}`);
})