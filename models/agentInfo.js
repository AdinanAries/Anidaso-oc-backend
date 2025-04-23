const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const agentInfoSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    property: {
        type: String,
        required: [true, "Please add the infomation property/title"],
    },
    value: {
        type: String,
        required: [true, "Please add the value you're setting for this property"],
    }
},
{
    timestamps: true
});

module.exports = agentInfoSchema;