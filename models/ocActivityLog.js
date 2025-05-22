const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ocActivityLogSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add user_id field"],
    },
    resource_id: {
        type: String
    },
    resource_type: {
        type: String
    },
    client: {
        type: Object
    },
    title: {
        type: String,
        required: [true, "Please add title field"],
        
    },
    body: {
        type: String,
        required: [true, "Please add body field"],
    },
    type: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = ocActivityLogSchema;