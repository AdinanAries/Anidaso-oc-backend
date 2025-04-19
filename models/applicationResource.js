const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const applicationResourceSchema = new Schema({
    resource_type_id: { // binds actions to resources
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicationResourceType' 
    },
    resource_title: {
        type: String,
        required: [true, "Please add role description"]
    },
    description: {
        type: String,
        required: [true, "Please add role description"]
    },
    constant: {
        type: Number,
        required: [true, "Please add app constant for this resource"],
        unique: true,
    }
},
{
    timestamps: true
});

module.exports = applicationResourceSchema;