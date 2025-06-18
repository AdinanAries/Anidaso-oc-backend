//models
const {
    User,
    UserRole,
    BookingIntentLog
} = require("../mongo_db_connections");

const CONSTANTS = require("../constants");


/**
 * @desc Returns All Sales based on Filters
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_all_sales = async (req, res, next) => {
    try{

        const user_id = req.params.oc_user_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        const {
            interval,
            sale_type,
            product_type,
        } = req.body.filters;
    
        if(!user_id){
            res.status(400);
            res.send({message: "user_id field is required!"});
            return;
        }
    
        let search_obj = {
            oc_user_id: user_id
        }
        
        // Find User
        const user = await User.findOne({_id: user_id});
        if(!user) {
            res.status(400);
            res.send({message: "User was not found!"});
            return;
        }
    
        // Get User role
        let usr_role = await UserRole.findOne({_id: user?.role_id});
    
        if(!usr_role) {
            res.status(400);
            res.send({message: "User role does not exist"});
            return;
        }
    
        // Check if Admin or Owner - then remove user-id to get all bookings
        const admin_const = CONSTANTS.app_role_constants.admin;
        const owner_const = CONSTANTS.app_role_constants.owner;
        const role_const = usr_role?.constant;
        if(role_const===admin_const || role_const===owner_const){
            search_obj = {};
        }
    
        let total_items = await BookingIntentLog.count({
            ...search_obj,
            payment_status: "succeeded",
            booking_status: "confirmed",
        }).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
    
        res.set("Pagination-Total-Items", total_items);
    
        let bookings = await BookingHistory.find(search_obj).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
        
        res.send(bookings);
        
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Returns All Sales on Monthly Basis with Filters
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_monthly_sales = async (req, res, next) => {
    try{

        const user_id = req.params.oc_user_id;

        const {
            interval,
            sale_type,
            product_type,
        } = req.body.filters;
    
        if(!user_id){
            res.status(400);
            res.send({message: "user_id field is required!"});
            return;
        }
    
        let search_obj = {
            oc_user_id: user_id
        }
        
        // Find User
        const user = await User.findOne({_id: user_id});
        if(!user) {
            res.status(400);
            res.send({message: "User was not found!"});
            return;
        }
    
        // Get User role
        let usr_role = await UserRole.findOne({_id: user?.role_id});
    
        if(!usr_role) {
            res.status(400);
            res.send({message: "User role does not exist"});
            return;
        }
    
        // Check if Admin or Owner - then remove user-id to get all bookings
        const admin_const = CONSTANTS.app_role_constants.admin;
        const owner_const = CONSTANTS.app_role_constants.owner;
        const role_const = usr_role?.constant;
        if(role_const===admin_const || role_const===owner_const){
            search_obj = {};
        }
    
        let bookings = await BookingIntentLog.aggregate([
            {
                $match: {
                    ...search_obj,
                    payment_status: "succeeded",
                    booking_status: "confirmed",
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
                    documents: { $push: "$$ROOT" }, // Push the entire document into an array
                    count: { $sum: 1 } // Count the number of documents in each group
                }
            },
            {
                $sort: { _id: -1 } // Sort by month in ascending order
            },
            {
                $limit: 12, // Last 12 Months Only
            }
        ]).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
        
        res.send(bookings);
        
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

module.exports = {
    get_all_sales,
    get_monthly_sales
}