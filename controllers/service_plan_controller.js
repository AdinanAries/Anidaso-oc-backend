//models
const {
    ServicePlanTierInfo
} = require("../mongo_db_connections");


/**
 * @desc Create Service Plan Tier
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_service_plan_tier = async (req, res, next) => {
    try{
        const {
            name,
            price,
            description,
            actions_per_unit,
            total_customers_allowed,
            number_of_suppliers_allowed,
            other_parameters,
            currency,
            constant,
        } = req.body;

        if(
            !name ||
            price===undefined ||
            !description ||
            actions_per_unit===undefined ||
            total_customers_allowed===undefined ||
            number_of_suppliers_allowed===undefined ||
            other_parameters===undefined ||
            !currency,
            constant===undefined
        ){
            res.status(400);
            res.send({message: "all fields are required!"});
            return;
        }

        // Check if Tier already exists
        const planExists = await ServicePlanTierInfo.findOne({
            name,
        });

        if(planExists) {
            res.status(400);
            res.send({message: "Service Plan Tier already exists"});
            return;
        }

        // Create new Service Plan Tier
        const plan = new ServicePlanTierInfo({
            name,
            price,
            description,
            actions_per_unit,
            total_customers_allowed,
            number_of_suppliers_allowed,
            other_parameters,
            currency,
            constant,
        });
        plan.save().then((result) => {
            console.log(result)
            res.status(201).send({
                _id: result._id,
                name: result.name,
                price: result.price,
                description: result.description,
                actions_per_unit: result.actions_per_unit,
                total_customers_allowed: result.total_customers_allowed,
                number_of_suppliers_allowed: result.number_of_suppliers_allowed,
                other_parameters: result.other_parameters,
                currency: result.currency,
                constant: result.constant,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Company could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Update existing Service Plan Tier
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const update_service_plan_tier = async (req, res, next) => {
    try{
        const {
            _id,
            name,
            price,
            description,
            actions_per_unit,
            total_customers_allowed,
            number_of_suppliers_allowed,
            other_parameters,
            currency,
            constant,
        } = req.body;

        if(
            !_id ||
            !name ||
            price===undefined ||
            !description ||
            actions_per_unit===undefined ||
            total_customers_allowed===undefined ||
            number_of_suppliers_allowed===undefined ||
            other_parameters===undefined ||
            !currency,
            constant===undefined
        ){
            res.status(400);
            res.send({message: "all fields are required!"});
            return;
        }

        // Check if company already exists
        let planExists = await ServicePlanTierInfo.findOne({_id});

        if(planExists) {
            let __updated = await ServicePlanTierInfo.updateOne({_id}, {
                name,
                price,
                description,
                actions_per_unit,
                total_customers_allowed,
                number_of_suppliers_allowed,
                other_parameters,
                currency,
                constant,
            });
            if (__updated.matchedCount === 0) {
                // No document matching the filter was found
                console.log("Company was not found during update!");
                was_updated_status="Company was not found during update!";
                res.status(400);
                res.send({message: was_updated_status});
                return
            } else if (__updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                console.log("Company already exists however failed on update!");
                was_updated_status="Company already exists however failed on update!";
                res.status(400);
                res.send({message: was_updated_status});
                return;
            }else {
                console.log("Company already exists and was updated!");
                was_updated_status="Company already exists and was updated!";
                // Fetching new updated record
                planExists = await ServicePlanTierInfo.findOne({_id});
            }
            res.status(201).send({
                _id: planExists._id,
                name: planExists.name,
                price: planExists.price,
                description: planExists.description,
                actions_per_unit: planExists.actions_per_unit,
                total_customers_allowed: planExists.total_customers_allowed,
                number_of_suppliers_allowed: planExists.number_of_suppliers_allowed,
                other_parameters: planExists.other_parameters,
                currency: planExists.currency,
                constant: planExists.constant,
            });
        }else{
            res.status(500);
            res.send({message: 'Service Plan Tier to update was not found'});
        }
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Get All Service Plan Tier
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const get_service_plan_tiers = (req, res, next) => {
    try{
        ServicePlanTierInfo.find({}).then((tiers) => {
            res.status(200).send(tiers);
        }).catch((err) => {
            console.log(err);
            res.status(500).send({message: "Server Error"});
        }); 
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    add_service_plan_tier,
    get_service_plan_tiers,
    update_service_plan_tier,
}