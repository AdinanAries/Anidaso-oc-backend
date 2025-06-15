//models
const {
    AgentServiceFee,
} = require("../mongo_db_connections");

/**
 * @desc Create new Agent Service Fee
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const addAgentServiceFee = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            product,
            name,
            price,
            enabled,
        } = req.body;

        const __id = (req?.body?._id || "");
        
        let _deleted = (req?.body?.deleted || false);
        was_updated_status="";

        if(!oc_user_id){
            res.status(400);
            res.send({message: "agent/user-id not specified!"});
            return;
        }

        if(
            product===undefined || 
            !name ||
            !price
        ){
            res.status(400);
            res.send({message: "name, price, and product type fields are required!"});
            return;
        }

        // Items with Id already exists
        if(__id){

            // Check if service fee exists 
            let serviceFeeExists = await AgentServiceFee.findOne({_id: __id});

            if(serviceFeeExists) {
                res.status(201);
                let __updated = await AgentServiceFee.updateOne({_id: __id}, {
                    oc_user_id, 
                    product, 
                    name,
                    price,
                    enabled,
                    deleted: _deleted
                });
                if (__updated.matchedCount === 0) {
                    // No document matching the filter was found
                    console.log("Service fee was not found during update!");
                    was_updated_status="Service fee was not found during update!";
                    res.status(400);
                    res.send({message: was_updated_status});
                    return
                } else if (__updated.modifiedCount === 0) {
                    // A document was matched, but not modified (e.g., the update didn't change any values)
                    console.log("Service fee already exists however failed on update!");
                    was_updated_status="Service fee already exists however failed on update!";
                    res.status(400);
                    res.send({message: was_updated_status});
                    return;
                }else {
                    console.log("Service fee already exists and was updated!");
                    was_updated_status="Service fee already exists and was updated!";
                    // Fetching newly updated record
                    serviceFeeExists = await AgentServiceFee.findOne({oc_user_id, product, name});
                }
                res.send({
                    _id: serviceFeeExists?._id,
                    oc_user_id: serviceFeeExists?.oc_user_id,
                    product: serviceFeeExists?.product,
                    name: serviceFeeExists?.name,
                    price: serviceFeeExists?.price,
                    enabled: serviceFeeExists?.enabled,
                    was_updated_status: was_updated_status
                });
                return;
            }
        }

        // Check if service fee exists 
        let serviceFeeExists = await AgentServiceFee.findOne({oc_user_id, product, name});

        if(serviceFeeExists) {
            res.status(201);
            let __updated = await AgentServiceFee.updateOne({oc_user_id, product, name}, {
                price,
                enabled,
                deleted: _deleted
            });
            if (__updated.matchedCount === 0) {
                // No document matching the filter was found
                console.log("Service fee was not found during update!");
                was_updated_status="Service fee was not found during update!";
                return
            } else if (__updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                console.log("Service fee already exists however failed on update!");
                was_updated_status="Service fee already exists however failed on update!";
                return;
            }else {
                console.log("Service fee already exists and was updated!");
                was_updated_status="Service fee already exists and was updated!";
                // Fetching newly updated record
                serviceFeeExists = await AgentServiceFee.findOne({oc_user_id, product, name});
            }
            res.send({
                _id: serviceFeeExists?._id,
                oc_user_id: serviceFeeExists?.oc_user_id,
                product: serviceFeeExists?.product,
                name: serviceFeeExists?.name,
                price: serviceFeeExists?.price,
                enabled: serviceFeeExists?.enabled,
                was_updated_status: was_updated_status
            });
            return;
        }

        // Create new agent service fee
        const service_fee = new AgentServiceFee({
            oc_user_id,
            product,
            name,
            price,
            enabled,
            deleted: _deleted
        });
        service_fee.save().then((result) => {
            res.status(201).send({
                _id: result._id,
                oc_user_id: result.oc_user_id,
                product: result.product,
                name: result.name,
                price: result.price,
                enabled: result.enabled,
                deleted: result.deleted
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
 * @desc Get All Agent Service Fees
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const getAgentServiceFees = async (req, res, next) => {
    try {
        
        let oc_user_id = req?.params?.oc_user_id;

        if(!oc_user_id){
            res.status(400);
            res.send({message: "agent/user-id field is required!"});
            return;
        }

        let service_fees = await AgentServiceFee.find({oc_user_id, deleted: false}).catch(err => {
            console.log(err);
            res.status(500);
            res.send({message: "Error while fetching data from DB"});
        });
        
        res.send(service_fees);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }

}

module.exports = {
    getAgentServiceFees,
    addAgentServiceFee,
}