const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agentBookingEngineSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    enableBookingEngine: {
        type: Boolean,
        required: [true, "Please add enableBookingEngine field"]
    },
    showHeader: {
        type: Boolean,
        required: [true, "Please add showHeader field"]
    },
    headerBg: {
        type: String,
        required: [true, "Please add headerBg field"]
    },
    headerCompanyTxtColor: {
        type: String,
        required: [true, "Please add headerCompanyTxtColor field"]
    },
    showHeaderCompany: {
        type: Boolean,
        required: [true, "Please add showHeaderCompany field"]
    },
    showHeaderMenu: {
        type: Boolean,
        required: [true, "Please add showHeaderMenu field"]
    },
    headerMenuTxtColor: {
        type: String,
        required: [true, "Please add headerMenuTxtColor field"]
    },
    headerMenuIconColor: {
        type: String,
        required: [true, "Please add headerMenuIconColor field"]
    },
    headerMenuActiveTxtColor: {
        type: String,
        required: [true, "Please add headerMenuActiveTxtColor field"]
    },
    headerMenuActiveIconColor: {
        type: String,
        required: [true, "Please add headerMenuActiveIconColor field"]
    },
    actionButtonsBg: {
        type: String,
        required: [true, "Please add actionButtonsBg field"]
    },
    actionButtonsTxtColor: {
        type: String,
        required: [true, "Please add actionButtonsTxtColor field"]
    },
    actionButtonsIconColor: {
        type: String,
        required: [true, "Please add actionButtonsIconColor field"]
    },
    closeButtonBgColor: {
        type: String,
        required: [true, "Please add closeButtonBgColor field"]
    },
    closeButtonIconColor: {
        type: String,
        required: [true, "Please add closeButtonIconColor field"]
    },
    showSearchFilters: {
        type: Boolean,
        required: [true, "Please add showSearchFilters field"]
    },
    searchFiltersTxtColor: {
        type: String,
        required: [true, "Please add searchFiltersTxtColor field"]
    },
    searchFiltersIconColor: {
        type: String,
        required: [true, "Please add searchFiltersIconColor field"]
    },
    searchFiltersIndicatorColor: {
        type: String,
        required: [true, "Please add searchFiltersIndicatorColor field"]
    },
    headerLogoBorderRadius: {
        type: Number,
        required: [true, "Please add searchFiltersIndicatorColor field"]
    },
    searchButtonBorderRadius: {
        type: Number,
        required: [true, "Please add searchButtonBorderRadius field"]
    },
    actionButtonBorderRadius: {
        type: Number,
        required: [true, "Please add actionButtonBorderRadius field"]
    },
    closeButtonBorderRadius: {
        type: Number,
        required: [true, "Please add closeButtonBorderRadius field"]
    },
},
{
    timestamps: true
});

module.exports = agentBookingEngineSchema;