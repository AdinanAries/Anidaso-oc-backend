const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Lookup Table
const canActionSchema = new Schema({
    resource_type_id: { // binds actions to resources
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ApplicationResourceType' 
    },
    action_title: {
        type: String,
        required: [true, "Please add action title"]
    },
    description: {
        type: String,
        required: [true, "Please add action description"]
    },
    constant: {
        type: Number,
        required: [true, "Please add constant number: 1=>View, 2=>AddNew, 3=>Edit, 4=>Remove, ..."],
        unique: true,
    },
},
{
    timestamps: true
});

module.exports = canActionSchema;