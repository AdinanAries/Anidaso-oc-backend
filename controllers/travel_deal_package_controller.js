const CONSTANTS = require("../constants");
//models
const {
    TravelDealPackage,
    UserRole,
    User,
} = require("../mongo_db_connections");

/**
 * @desc Get all Travel Deals And Packages
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_travel_deal_packages = async (req, res, next) => {

    try{
        const user_id = req.params.oc_user_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        let {
            filters,
        } = req.body;

        if(!user_id){
            res.status(400);
            res.send({message: "oc_user_id field is required!"});
            return;
        }

        let user = await User.findOne({_id: user_id});

        if(!user){
            res.status(400);
            res.send({message: "User account could not be verified!"});
            return;
        }

        role_info={};
        if(user?.role_id){
            role_info = await UserRole.findOne({_id: user?.role_id});
        }

        if(!role_info){
            res.status(400);
            res.send({message: "User role could not be confirmed!"});
            return;
        }

        let find_obj = {
            deleted: false,
            oc_user_id: user_id
        };

        if(
            role_info?.constant===CONSTANTS.app_role_constants.admin ||
            role_info?.constant===CONSTANTS.app_role_constants.owner
        ){
            delete find_obj.oc_user_id;
        }

        let total_items = await TravelDealPackage.count(find_obj).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });

        res.set("Pagination-Total-Items", total_items);

        let _deals_packages = await TravelDealPackage.find(find_obj).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });
        
        res.send(_deals_packages);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

/**
 * @desc Create new Travel Deal or Package
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_travel_deal_package = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            type,
            view_template,
            view_theme,
            title,
            total_price,
            price_currency,
            travel_destination,
            start_date,
            end_date,
            include_dults,
            include_children,
            include_infants,
            max_num_of_adults,
            max_num_of_children,
            max_num_of_infants,
            cover_picture,
            html_description,
            text_editor_content,
            items
        } = req.body;

        const __id = (req?.body?._id || "");

        let _deleted = (req?.body?.deleted || false);
        was_updated_status="";

        if(
            !oc_user_id ||
            !type ||
            !view_template ||
            !view_theme ||
            !title ||
            !total_price ||
            !price_currency ||
            !travel_destination ||
            !start_date ||
            !end_date ||
            include_dults===undefined ||
            include_children===undefined ||
            include_infants===undefined ||
            max_num_of_adults===undefined ||
            max_num_of_children===undefined ||
            max_num_of_infants===undefined ||
            !cover_picture ||
            html_description===undefined ||
            text_editor_content===undefined ||
            items===undefined
        ){
            res.status(400);
            res.send({message: "All fields are required!"});
            return;
        }

        // Items with Id already exists
        if(__id){

            // Check if Deal/Package exists 
            let dealPackageExists = await TravelDealPackage.findOne({_id: __id});

            if(dealPackageExists) {
                res.status(201);
                let __updated = await TravelDealPackage.updateOne({_id: __id}, {
                    oc_user_id,
                    type,
                    view_template,
                    view_theme,
                    title,
                    total_price,
                    price_currency,
                    travel_destination,
                    start_date,
                    end_date,
                    include_dults,
                    include_children,
                    include_infants,
                    max_num_of_adults,
                    max_num_of_children,
                    max_num_of_infants,
                    cover_picture,
                    html_description,
                    text_editor_content,
                    items,
                    deleted: _deleted
                });
                if (__updated.matchedCount === 0) {
                    // No document matching the filter was found
                    console.log("Deal/Package was not found during update!");
                    was_updated_status="Deal/Package was not found during update!";
                    return
                } else if (__updated.modifiedCount === 0) {
                    // A document was matched, but not modified (e.g., the update didn't change any values)
                    console.log("Deal/Package already exists however failed on update!");
                    was_updated_status="Deal/Package already exists however failed on update!";
                    return;
                }else {
                    console.log("Deal/Package already exists and was updated!");
                    was_updated_status="Deal/Package already exists and was updated!";
                    // Fetching newly updated record
                    dealPackageExists = await TravelDealPackage.findOne({_id: __id});
                }
                res.send({
                    _id: dealPackageExists?._id,
                    oc_user_id: dealPackageExists?.oc_user_id,
                    type: dealPackageExists?.type,
                    view_template: dealPackageExists?.view_template,
                    view_theme: dealPackageExists?.view_theme,
                    title: dealPackageExists?.title,
                    total_price: dealPackageExists?.total_price,
                    price_currency: dealPackageExists?.price_currency,
                    travel_destination: dealPackageExists?.travel_destination,
                    start_date: dealPackageExists?.start_date,
                    end_date: dealPackageExists?.end_date,
                    include_dults: dealPackageExists?.include_dults,
                    include_children: dealPackageExists?.include_children,
                    include_infants: dealPackageExists?.include_infants,
                    max_num_of_adults: dealPackageExists?.max_num_of_adults,
                    max_num_of_children: dealPackageExists?.max_num_of_children,
                    max_num_of_infants: dealPackageExists?.max_num_of_infants,
                    cover_picture: dealPackageExists?.cover_picture,
                    html_description: dealPackageExists?.html_description,
                    text_editor_content: dealPackageExists?.text_editor_content,
                    items: dealPackageExists?.items,
                    deleted: dealPackageExists?.deleted,
                    was_updated_status: was_updated_status
                });
                return;
            }
        }

        // Create new Travel Deal/Package
        const _deal_package = new TravelDealPackage({
            oc_user_id,
            type,
            view_template,
            view_theme,
            title,
            total_price,
            price_currency,
            travel_destination,
            start_date,
            end_date,
            include_dults,
            include_children,
            include_infants,
            max_num_of_adults,
            max_num_of_children,
            max_num_of_infants,
            cover_picture,
            html_description,
            text_editor_content,
            items,
            deleted: _deleted
        });
        _deal_package.save().then((result) => {
            res.status(201).send({
                _id: result?._id,
                oc_user_id: result?.oc_user_id,
                type: result?.type,
                view_template: result?.view_template,
                view_theme: result?.view_theme,
                title: result?.title,
                total_price: result?.total_price,
                price_currency: result?.price_currency,
                travel_destination: result?.travel_destination,
                start_date: result?.start_date,
                end_date: result?.end_date,
                include_dults: result?.include_dults,
                include_children: result?.include_children,
                include_infants: result?.include_infants,
                max_num_of_adults: result?.max_num_of_adults,
                max_num_of_children: result?.max_num_of_children,
                max_num_of_infants: result?.max_num_of_infants,
                cover_picture: result?.cover_picture,
                html_description: result?.html_description,
                text_editor_content: result?.text_editor_content,
                items: result?.items,
                deleted: result.deleted
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Deal/Package could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Search Travel Deal or Package
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const search_travel_deal_package = async(req, res, next) => { // To do: fix this function
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

        let total_items = await TravelDealPackage.count(search_obj).catch(err => {
            console.log(err);
            res.send([]);
            return;
        });

        res.set("Pagination-Total-Items", total_items);

        let _customers = await TravelDealPackage.find(search_obj).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
    add_travel_deal_package,
    get_travel_deal_packages,
    search_travel_deal_package,
}