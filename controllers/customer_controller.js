//models
const {
    Customer
} = require("../mongo_db_connections");

/**
 * @desc Get all Customers of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_customers_of_agent = async (req, res, next) => {

    try{
        const user_id = req.params.oc_user_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        if(!user_id){
            res.status(400);
            res.send({message: "oc_user_id field is required!"});
            return;
        }

        let total_items = await Customer.count({oc_user_id: user_id, deleted: false}).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });

        res.set("Pagination-Total-Items", total_items);

        let _customers = await Customer.find({oc_user_id: user_id, deleted: false}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
        
        res.send(_customers);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

/**
 * @desc Create new Customer
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_customer = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            first_name,
            last_name,
            email,
            phone,
            dob,
            gender,
            address,
            city,
            state,
            country,
            zip_code,
        } = req.body;

        const __id = (req?.body?._id || "");

        let _deleted = (req?.body?.deleted || false);
        was_updated_status="";

        if(
            !first_name ||
            !last_name ||
            !email
        ){
            res.status(400);
            res.send({message: "first and last names and email are required!"});
            return;
        }

        // Items with Id already exists
        if(__id){

            // Check if service fee exists 
            let customerExists = await Customer.findOne({_id: __id});

            if(customerExists) {
                res.status(201);
                let __updated = await Customer.updateOne({_id: __id}, {
                    oc_user_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    dob,
                    gender,
                    address,
                    city,
                    state,
                    country,
                    zip_code,
                    deleted: _deleted
                });
                if (__updated.matchedCount === 0) {
                    // No document matching the filter was found
                    console.log("Customer was not found during update!");
                    was_updated_status="Customer was not found during update!";
                    return
                } else if (__updated.modifiedCount === 0) {
                    // A document was matched, but not modified (e.g., the update didn't change any values)
                    console.log("Customer already exists however failed on update!");
                    was_updated_status="Customer already exists however failed on update!";
                    return;
                }else {
                    console.log("Customer already exists and was updated!");
                    was_updated_status="Customer already exists and was updated!";
                    // Fetching newly updated record
                    customerExists = await Customer.findOne({_id: __id});
                }
                res.send({
                    _id: customerExists?._id,
                    oc_user_id: customerExists.oc_user_id,
                    first_name: customerExists.first_name,
                    last_name: customerExists.last_name,
                    email: customerExists.email,
                    phone: customerExists.phone,
                    dob: customerExists.dob,
                    gender: customerExists.gender,
                    address: customerExists.address,
                    city: customerExists.city,
                    state: customerExists.state,
                    country: customerExists.country,
                    zip_code: customerExists.zip_code,
                    deleted: customerExists.deleted,
                    was_updated_status: was_updated_status
                });
                return;
            }
        }

        // Check if customer exists
        const customerExists = await Customer.findOne({
            oc_user_id,
            email
        });

        if(customerExists) {
            res.status(400);
            res.send({message: "Customer with this email already exist"});
            return;
        }

        // Create new Customer
        const _customer = new Customer({
            oc_user_id,
            first_name,
            last_name,
            email,
            phone,
            dob,
            gender,
            address,
            city,
            state,
            country,
            zip_code,
            deleted: _deleted
        });
        _customer.save().then((result) => {
            res.status(201).send({
                _id: result._id,
                oc_user_id: result.oc_user_id,
                first_name: result.first_name,
                last_name: result.last_name,
                email: result.email,
                phone: result.phone,
                dob: result.dob,
                gender: result.gender,
                address: result.address,
                city: result.city,
                state: result.state,
                country: result.country,
                zip_code: result.zip_code,
                deleted: result.deleted
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Booking link could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * 
 */
const search_customer_of_agent = async(req, res, next) => {
    try{
        const user_id = req.params.oc_user_id;
        let q = req.params.query;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        if(!user_id){
            res.status(400);
            res.send({message: "oc_user_id field is required!"});
            return;
        }

        let q2 = q;
        if(q.trim().includes(" ")){
            const _q = q.trim().split(" ");
            q = _q[0];
            q2 = _q[1];
        }

        const search_obj = {
            oc_user_id: user_id, 
            deleted: false,
            $or: [
                {first_name: { $regex : q, $options: 'i'}},
                {last_name: { $regex : q2, $options: 'i'}},
                {email: { $regex : q, $options: 'i'}},
                {phone: { $regex : q, $options: 'i'}}
            ]
        }

        let total_items = await Customer.count(search_obj).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });

        res.set("Pagination-Total-Items", total_items);

        let _customers = await Customer.find(search_obj).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
        
        res.send(_customers);

    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
} 

module.exports = {
    add_customer,
    get_customers_of_agent,
    search_customer_of_agent,
}