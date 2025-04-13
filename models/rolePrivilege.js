const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rolePrivilegeSchema = new Schema({
    description: {
        type: String,
        required: [true, "Please add privilege description"]
    },
    pagesCanAccess: {
        type: Array,
        required: [true, "Please add page IDs"]
    },
    resourcesCanActions: [
        {
            resources_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ApplicationResource',
                required: [true, "Please add resource ID"]
            },
            canActions: {
                type: Array,
                required: [true, "Please add privilege action IDs"]
            }
        }
    ]
},
{
    timestamps: true
});

module.exports = rolePrivilegeSchema;