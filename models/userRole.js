const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Lookup Table
const userRoleSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please add role title"]
    },
    privilege_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RolePrivilege',
        required: [true, "Please add role privilege ID"]
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