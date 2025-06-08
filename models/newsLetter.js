const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newsLetterSchema = new Schema({
    oc_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please add role agent/user-id"]
    },
    template_name: {
        type: String,
        required: [true, "Please add the template name"],
    },
    saved_state: {
        type: String,
        required: [true, "Please add the saved state"],
    }
},
{
    timestamps: true
});

module.exports = newsLetterSchema;