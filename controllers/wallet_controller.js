//models
const {
    BookingLink,
    Wallet,
    WalletTransactionType,
    WalletTransaction,
    VisitedLink,
    BookedLink,
} = require("../mongo_db_connections");


/**
 * @desc Create new Agent Wallet
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_agent_wallet = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            last_top_up_date,
            current_balance,
            balance_currency
        } = req.body;

        if(!oc_user_id){
            res.status(400);
            res.send({message: "user-id field is required!"});
            return;
        }

        // Check if wallet already exists for this agent
        const walletExists = await Wallet.findOne({
            oc_user_id,
        });

        if(walletExists) {
            res.status(400);
            res.send({message: "Wallet already exists for this agent"});
            return;
        }

        // Create new agent wallet
        const wallet = new Wallet({
            oc_user_id,
            last_top_up_date,
            current_balance,
            balance_currency
        });
        wallet.save().then((result) => {
            console.log(result)
            res.status(201).send({
                _id: result._id,
                oc_user_id: result.oc_user_id,
                last_top_up_date: result.last_top_up_date,
                current_balance: result.current_balance,
                balance_currency: result.balance_currency,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Wallet could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Get Agent Wallet By ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getWalletByID = (req, res, next) => {
    try{
        const id=req.params.id;
        Wallet.findOne({_id: id}).then(async(wallet) => {
            res.status(200).send({
                _id: wallet._id,
                oc_user_id: wallet.oc_user_id,
                last_top_up_date: wallet.last_top_up_date,
                current_balance: wallet.current_balance,
                balance_currency: wallet.balance_currency
            });
        }).catch((err) => {
            console.log(err);
            res.status(500).send({message: "Server Error"});
        }); 
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

/**
 * @desc Get All Transaction Types
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const get_transaction_types = (req, res, next) => {
    try {
        WalletTransactionType.find({})
        .then((transactions) => {
            res.status(200).send(transactions);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({message: "Error fetching transactions from DB!"});
        }); 
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

/**
 * @desc Get All Transactions of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_transactions_of_agent = async (req, res, next) => {

    try{
        const wallet_id = req.params.wallet_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        if(!wallet_id){
            res.status(400);
            res.send({message: "wallet-id field is required!"});
            return;
        }

        let total_items = await WalletTransaction.count({wallet_id}).catch(err => {
            console.log(err);
            res.send([]);
        });

        res.set("Pagination-Total-Items", total_items);

        let wallet_transactions = await WalletTransaction.find({wallet_id}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
        });
        
        res.send(wallet_transactions);

    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

/**
 * @desc Create new Wallet Transaction of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_transaction_of_agent = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            transaction_type_constant,
            unit_quantity,
            unit_action_point_quantity,
            description,
        } = req.body;

        if(!oc_user_id){
            res.status(400);
            res.send({message: "agent-id field is required!"});
            return;
        }

        if(
            !transaction_type_constant ||
            !unit_quantity ||
            !unit_action_point_quantity ||
            !description
        ){
            res.status(400);
            res.send({message: "all fields fields are required!"});
            return;
        }

        // Get transaction type information by constant
        let transaction_type_id = "";
        let total_amount = 0;
        let total_action_points = 0;
        let _trans_type = await WalletTransactionType.findOne({constant: transaction_type_constant});
        if(_trans_type?._id){
            transaction_type_id = _trans_type?._id;
            total_amount = (unit_quantity*_trans_type?.unit_cost);
            total_action_points = (unit_action_point_quantity*_trans_type?.unit_action_point);
            //type
            //title,
            //cost_currency,
            //constant
        }

        // Update Agent Wallet Here
        let wallet_balance_before = 0;
        let wallet_balance_after = 0;
        let _wallet = await Wallet.findOne({oc_user_id});

        if(_wallet?._id){
            wallet_balance_before = _wallet?.current_balance;
            wallet_balance_after = (_wallet?.current_balance - total_amount);
            let wallet_updated = await Wallet.updateOne({oc_user_id}, {
                last_top_up_date: (new Date().toISOString()),
                current_balance: wallet_balance_after
            });
            if (wallet_updated.matchedCount === 0) {
                // No document matching the filter was found
                res.status(400);
                res.send({message: "Wallet was not found during balance update!"});
                return
            } else if (wallet_updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                res.status(400);
                res.send({message: "Wallet balance update failed!"});
                return;
            }
        } else {
            res.status(400);
            res.send({message: "Agent wallet not found!"});
            return;
        }

        // Create Wallet Transaction
        const transaction = new WalletTransaction({
            wallet_id: _wallet?._id,
            transaction_type_id,
            total_amount,
            total_action_points,
            description,
            wallet_balance_before,
            wallet_balance_after
        });

        transaction.save().then(async(result) => {

            res.status(201).send({
                _id: result._id,
                wallet_id: result.wallet_id,
                transaction_type_id: result.transaction_type_id,
                total_amount: result.total_amount,
                total_action_points: result.total_action_points,
                description: result.description,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Wallet transaction could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Create new Visited Booking Link of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_visited_link_of_agent = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            booking_link_id,
            customer_id,
            info,
            transaction_type_constant,
            unit_quantity,
            unit_action_point_quantity,
            description,
        } = req.body;

        console.log(req.body);

        if(!oc_user_id){
            res.status(400);
            res.send({message: "Agent-id field is required!"});
            return;
        }

        if(!booking_link_id){
            res.status(400);
            res.send({message: "Booking-link-id is required!"});
            return;
        }

        if(
            !transaction_type_constant ||
            !unit_quantity ||
            !unit_action_point_quantity ||
            !description
        ){
            res.status(400);
            res.send({message: "Transaction related fields are required!"});
            return;
        }

        // Get transaction type information by constant
        let transaction_type_id = "";
        let total_amount = 0;
        let total_action_points = 0;
        let _trans_type = await WalletTransactionType.findOne({constant: transaction_type_constant});
        if(_trans_type?._id){
            transaction_type_id = _trans_type?._id;
            total_amount = (unit_quantity*_trans_type?.unit_cost);
            total_action_points = (unit_action_point_quantity*_trans_type?.unit_action_point);
            //type
            //title,
            //cost_currency,
            //constant
        }

        // Update Agent Wallet Here
        let wallet_balance_before = 0;
        let wallet_balance_after = 0;
        let _wallet = await Wallet.findOne({oc_user_id});

        if(_wallet?._id){
            wallet_balance_before = _wallet?.current_balance;
            wallet_balance_after = (_wallet?.current_balance - total_amount);
            let wallet_updated = await Wallet.updateOne({oc_user_id}, {
                last_top_up_date: (new Date().toISOString()),
                current_balance: wallet_balance_after
            });
            if (wallet_updated.matchedCount === 0) {
                // No document matching the filter was found
                res.status(400);
                res.send({message: "Wallet was not found during balance update!"});
                return
            } else if (wallet_updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                res.status(400);
                res.send({message: "Wallet balance update failed!"});
                return;
            }
        } else {
            res.status(400);
            res.send({message: "Agent wallet not found!"});
            return;
        }

        // Create Wallet Transaction
        const transaction = new WalletTransaction({
            wallet_id: _wallet?._id,
            transaction_type_id,
            total_amount,
            total_action_points,
            description,
            wallet_balance_before,
            wallet_balance_after
        });

        let _trans = await transaction.save();

        if(_trans?._id) {

            // Create Visited Link
            const visited_link = new VisitedLink({
                oc_user_id,
                booking_link_id,
                wallet_transaction_id: _trans._id,
                customer_id,
                info,
            });

            visited_link.save().then(async (result) => {
    
                // Count total visited link for this booking link
                const total_visited = await VisitedLink.count({oc_user_id,booking_link_id});
                // Booking Booking Link Visited
                let bl_updated = await BookingLink.updateOne({
                    _id: booking_link_id
                }, {
                    visited: total_visited,
                });
                if (bl_updated.matchedCount === 0) {
                    // No document matching the filter was found
                    console.log("Booking link was not found during update!");
                    was_updated_status="Booking link was not found during update!";
                    return
                } else if (bl_updated.modifiedCount === 0) {
                    // A document was matched, but not modified (e.g., the update didn't change any values)
                    console.log("Booking link already exists however failed on update!");
                    was_updated_status="Booking link already exists however failed on update!";
                    return;
                }else {
                    console.log("Booking link already exists and was updated!");
                    was_updated_status="Booking link already exists and was updated!";
                }

                res.status(201).send({
                    _id: result._id,
                    oc_user_id: result.oc_user_id,
                    booking_link_id: result.booking_link_id,
                    wallet_transaction_id: result.wallet_transaction_id,
                    customer_id: result.customer_id,
                    info: result.info,
                    transaction_info: {
                        _id: _trans._id,
                        wallet_id: _trans.wallet_id,
                        transaction_type_id: _trans.transaction_type_id,
                        total_amount: _trans.total_amount,
                        total_action_points: _trans.total_action_points,
                        description: _trans.description,
                        wallet_balance_before: _trans.wallet_balance_before,
                        wallet_balance_after:_trans.wallet_balance_after
                    }
                });
            }).catch((err) => {
                console.log(err);
                res.status(500);
                res.send({message: 'Visited link could not be created'});
                return
            });
        }else{
            console.log(err);
            res.status(500);
            res.send({message: 'Wallet transaction could not be created'});
        }


    
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

module.exports = {
    getWalletByID,
    get_transaction_types,
    add_visited_link_of_agent,
    add_agent_wallet,
    add_transaction_of_agent,
    get_transactions_of_agent,
}