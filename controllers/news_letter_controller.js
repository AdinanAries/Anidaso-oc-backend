//models
const {
    NewsLetter,
} = require("../mongo_db_connections");

//utils
const {
    send_email,
} = require("../Email");


/**
 * @desc Saves News Letter
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const saveNewsLetter = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            template_name,
            saved_state
        } = req.body;
        
        if(
            !oc_user_id ||
            !template_name ||
            !saved_state
        ){
            res.status(400);
            res.send({message: "user/agent id, template name, and saved state are required!"});
            return;
        }

        // Check if news letter has been saved before
        let nlExists = await NewsLetter.findOne({
            oc_user_id,
            template_name
        });

        if(nlExists) {
            let __updated = await NewsLetter.updateOne({_id: nlExists?._id}, {
                oc_user_id,
                template_name,
                saved_state
            });
            if (__updated.matchedCount === 0) {
                // No document matching the filter was found
                console.log("Newsletter was not found during update!");
                was_updated_status="Newsletter was not found during update!";
                res.status(400);
                res.send({message: was_updated_status});
                return
            } else if (__updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                console.log("Newsletter already exists however failed on update!");
                was_updated_status="Newsletter already exists however failed on update!";
                res.status(400);
                res.send({message: was_updated_status});
                return;
            } else {
                console.log("Newsletter already exists and was updated!");
                was_updated_status="Newsletter already exists and was updated!";
                // Fetching new updated record
                nlExists = await NewsLetter.findOne({_id: nlExists?._id});
            }
            res.status(201).send({
                _id: nlExists._id,
                oc_user_id: nlExists.oc_user_id,
                template_name: nlExists.template_name,
                saved_state: nlExists.saved_state,
                was_updated_status: was_updated_status,
            });
            return;
        }

        // Create new news letter
        const nl = new NewsLetter({
            oc_user_id,
            template_name,
            saved_state
        });
        nl.save().then((result) => {
            res.status(201).send({
                _id: result._id,
                oc_user_id: result.oc_user_id,
                template_name: result.template_name,
                saved_state: result.saved_state
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'news letter could not be saved'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Gets Saved News letter agent id and template name
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getSavedNewsLetter = async (req, res, next) => {
    try{
        const oc_user_id=req.params.oc_user_id;
        const template_name=req.params.template_name;
        let nl = await NewsLetter.findOne({
            oc_user_id,
            template_name
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send({message: "Error while fetching data from DB"});
            return;
        });
        if(nl){
            res.status(200).send({
                _id: nl._id,
                oc_user_id: nl.oc_user_id,
                template_name: nl.template_name,
                saved_state: nl.saved_state
            });
            return;
        }else{
            res.status(200).send({});
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

/**
 * @desc Sends Newsletter Emails
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const sendNewsLetterEmail = async (req, res, next) => {
    try{
        const {
            to,
            from,
            subject,
            text,
            html
        } = req.body;
        const send_obj = {
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: html,
        };
        let __res = await send_email(send_obj);
        res.status(200).send(__res);
    } catch (err) {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

module.exports = {
    saveNewsLetter,
    getSavedNewsLetter,
    sendNewsLetterEmail,
}