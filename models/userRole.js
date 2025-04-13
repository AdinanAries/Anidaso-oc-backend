const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Lookup Table
const userRoleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add role title"]
    },
    role_privileges: {
        type: Array,
        required: [true, "Please add role privilege IDs"]
    },
    constant: {
        type: Number,
        required: [true, "Please add constant number: 1=>Owner, 2=>Admin, 3=>Agent, ..."],
        unique: true,
    }
},
{
    timestamps: true
});

module.exports = userRoleSchema;