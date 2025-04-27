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

        let total_items = await Customer.count({oc_user_id: user_id}).catch(err => {
            console.log(err);
            res.send([]);
        });

        res.set("Pagination-Total-Items", total_items);

        let _customers = await Customer.find({oc_user_id: user_id}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
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

        if(
            !first_name ||
            !last_name ||
            !email
        ){
            res.status(400);
            res.send({message: "first and last names and email are required!"});
            return;
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

module.exports = {
    add_customer,
    get_customers_of_agent,
}