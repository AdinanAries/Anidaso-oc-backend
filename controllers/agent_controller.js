//models
const {
    AgentInfo,
    User,
    CompanyInfo,
} = require("../mongo_db_connections");

/**
 * @desc Create new Agent Settings
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const addAgentSettings = async (req, res, next) => {
    try{
        const {
            user_id,
            property,
            value,
        } = req.body;

        if(!user_id){
            res.status(400);
            res.send({message: "user-id field is required!"});
            return;
        }

        if(!property || !value){
            res.status(400);
            res.send({message: "property and value fields are required!"});
            return;
        }

        // Check if agent info exists
        const infoExists = await AgentInfo.findOne({user_id, property});

        if(infoExists) {
            res.status(201);
            let _info = await AgentInfo.updateOne({user_id, property}, {value});
            res.send({
                _id: _info._id,
                user_id: _info.user_id,
                property: _info.property,
                value: _info.value
            });
            return;
        }

        // Create new agent info
        const info = new AgentInfo({
            user_id: user_id,
            property: property,
            value: value,
        });
        info.save().then((result) => {
            res.status(201).send({
                _id: result._id,
                user_id: result.user_id,
                property: result.property,
                value: result.value,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Agent Info could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Get Agent Info by Agent's user_id and info property/key
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const getAgentInfoSettings = async (req, res, next) => {
    try {
        
        let uid = req.params?.user_id;
        let prop = req.params?.property;

        let find_obj = {};

        if(!uid){
            res.status(400);
            res.send({message: "user ID field is required!"});
            return;
        }

        if(!prop){
            res.status(400);
            res.send({message: "property field is required!"});
            return;
        }

        find_obj.user_id = uid;
        find_obj.property = prop;

        let info = await AgentInfo.findOne(find_obj).catch(err => {
            console.log(err);
            res.status(500);
            res.send({message: "Error while fetching data from DB"});
        });
        
        res.send(info);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }

}

/**
 * @desc Get Basic Public Agent Info by Agent ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const getBasicPublicAgentInfo = async (req, res, next) => {
    try {
        
        let agent_id = req.params?.agent_id;

        if(!agent_id){
            res.status(400);
            res.send({message: "Agent-ID field is required!"});
            return;
        }

        let agent = await User.findOne({
            _id: agent_id,
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send({message: "Error while fetching user data from DB"});
        });

        let company_info = {}
        if(agent?.company_id){
            company_info = await CompanyInfo.findOne({
                _id: agent?.company_id
            }).catch(err => {
                console.log(err);
                res.status(500);
                res.send({message: "Error while fetching company data from DB"});
            })
        }
        
        res.send({
            first_name: agent?.first_name,
            last_name: agent?.last_name,
            email: agent?.email,
            phone: agent?.phone,
            company_info: {
                business_name: company_info.business_name,
                logo_url: company_info.logo_url,
                business_email: company_info.business_email,
                business_phone: company_info.business_phone,
                business_facebook_link: company_info.business_facebook_link,
                business_twitter_link: company_info.business_twitter_link,
                business_instagram_link: company_info.business_instagram_link,
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }

}

module.exports = {
    getAgentInfoSettings,
    addAgentSettings,
    getBasicPublicAgentInfo,
}