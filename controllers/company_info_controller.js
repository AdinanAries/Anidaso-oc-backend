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
}