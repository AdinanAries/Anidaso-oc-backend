//models
const {
    User,
    CompanyInfo
} = require("../mongo_db_connections");


/**
 * @desc Create new Company
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_company = async (req, res, next) => {
    try{
        const {
            business_name,
            logo_url,
            business_email,
            business_phone,
            business_facebook_link,
            business_twitter_link,
            business_instagram_link,
        } = req.body;

        if(
            !business_name ||
            !business_email ||
            !business_phone
        ){
            res.status(400);
            res.send({message: "business name, email, and phone are required!"});
            return;
        }

        // Check if company already exists
        const companyExists = await CompanyInfo.findOne({
            business_name,
            business_email,
            business_phone
        });

        if(companyExists) {
            res.status(400);
            res.send({message: "Company already exists"});
            return;
        }

        // Create new company
        const company = new CompanyInfo({
            business_name,
            logo_url,
            business_email,
            business_phone,
            business_facebook_link,
            business_twitter_link,
            business_instagram_link,
        });
        company.save().then((result) => {
            console.log(result)
            res.status(201).send({
                _id: result._id,
                business_name: result.business_name,
                logo_url: result.logo_url,
                business_email: result.business_email,
                business_phone: result.business_phone,
                business_facebook_link: result.business_facebook_link,
                business_twitter_link: result.business_twitter_link,
                business_instagram_link: result.business_instagram_link,
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
 * @desc Update existing Company
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const update_company = async (req, res, next) => {
    try{
        const {
            _id,
            business_name,
            logo_url,
            business_email,
            business_phone,
            business_facebook_link,
            business_twitter_link,
            business_instagram_link,
        } = req.body;

        if(
            !_id ||
            !business_name ||
            !business_email ||
            !business_phone
        ){
            res.status(400);
            res.send({message: "_id, business name, email, and phone are required!"});
            return;
        }

        // Check if company already exists
        let companyExists = await CompanyInfo.findOne({_id});

        if(companyExists) {
            let __updated = await CompanyInfo.updateOne({_id}, {
                business_name,
                logo_url,
                business_email,
                business_phone,
                business_facebook_link,
                business_twitter_link,
                business_instagram_link
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
                companyExists = await CompanyInfo.findOne({_id});
            }
            res.status(201).send({
                _id: companyExists._id,
                business_name: companyExists.business_name,
                logo_url: companyExists.logo_url,
                business_email: companyExists.business_email,
                business_phone: companyExists.business_phone,
                business_facebook_link: companyExists.business_facebook_link,
                business_twitter_link: companyExists.business_twitter_link,
                business_instagram_link: companyExists.business_instagram_link,
            });
        }else{
            res.status(500);
            res.send({message: 'Company to update was not found'});
        }
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Get Company By ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const get_company_id = (req, res, next) => {
    try{
        const id=req.params.id;
        CompanyInfo.findOne({_id: id}).then(async(company) => {
            res.status(200).send({
                _id: company._id,
                business_name: company.business_name,
                logo_url: company.logo_url,
                business_email: company.business_email,
                business_phone: company.business_phone,
                business_facebook_link: company.business_facebook_link,
                business_twitter_link: company.business_twitter_link,
                business_instagram_link: company.business_instagram_link,
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

module.exports = {
    add_company,
    get_company_id,
    update_company,
}