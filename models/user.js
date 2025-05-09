const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    company_id: {
        type: String,
        required: false,
    },
    first_name: {
        type: String,
        required: [true, "Please add first name"]
    },
    middle_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: [true, "Pleae add last name"],
    },
    dob: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: [true, "Please add phone"]
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add password"]
    },
    make_new_password: {
        type: Boolean,
        required: [true, "Please add make_new_password property value"]
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole' 
    },
    imageUrl: {
    type: String,
    required: false
   }
},
{
    timestamps: true
});

module.exports = userSchema;