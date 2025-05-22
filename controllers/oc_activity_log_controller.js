//models
const {
    OcActivityLog,
} = require("../mongo_db_connections");

/**
 * @desc Create new Activity Log
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const addActivityLog = async (req, res, next) => {
    try{
        const {
            user_id,
            resource_id,
            resource_type,
            client,
            title,
            body,
            type
        } = req.body;

        if(
            !user_id,
            !title,
            !body
        ){
            res.status(400);
            res.send({message: "agent/user-id, title, and body fields are required!"});
            return;
        }

        // Create new activity log
        const a_log = new OcActivityLog({
            user_id,
            resource_id,
            resource_type,
            client,
            title,
            body,
            type
        });
        a_log.save().then((result) => {
            res.status(201).send({
                _id: result._id,
                user_id: result.user_id,
                resource_id: result.resource_id,
                resource_type: result.resource_type,
                client: result.client,
                title: result.title,
                body: result.body,
                type: result.type
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Service fee could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Get All Activity Logs of User
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const getActivityLogsByUserId = async (req, res, next) => {
    try {

        const user_id = req.params.user_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        if(!user_id){
            res.status(400);
            res.send({message: "oc_user_id field is required!"});
            return;
        }

        let total_items = await OcActivityLog.count({user_id}).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });

        res.set("Pagination-Total-Items", total_items);

        let a_logs = await OcActivityLog.find({user_id}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
        
        res.send(a_logs);

    } catch (e) {
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }

}

module.exports = {
    getActivityLogsByUserId,
    addActivityLog,
}