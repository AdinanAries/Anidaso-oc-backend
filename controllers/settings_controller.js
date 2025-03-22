//models
const {
    CustAppServerSettings,
    OcServerSettings
} = require("../mongo_db_connections");

/**
 * @desc Create new OC server settings
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const addOcServerSettings = async (req, res, next) => {
    try{
        const {
            property,
            value,
        } = req.body;

        if(!property || !value){
            res.status(400);
            res.send({message: "Both the settings property and associated value are required!"});
        }

        // Check if user exists
        const settingsExists = await OcServerSettings.findOne({property});

        if(settingsExists) {
            res.status(400);
            res.send({message: "This server-settings already exists"});
            return;
        }

        // Create new server settings
        const settings = new OcServerSettings({
            property: property,
            value: value,
        });
        settings.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                property: result.property,
                value: result.value,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Server settings could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Create new customer app server settings
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const addCustAppServerSettings = async (req, res, next) => {
    try{
        const {
            property,
            value,
        } = req.body;

        if(!property || !value){
            res.status(400);
            res.send({message: "Both the settings property and associated value are required!"});
        }

        // Check if user exists
        const settingsExists = await CustAppServerSettings.findOne({property});

        if(settingsExists) {
            res.status(400);
            res.send({message: "This server-settings already exists"});
            return;
        }

        // Create new server settings
        const settings = new CustAppServerSettings({
            property: property,
            value: value,
        });
        settings.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                property: result.property,
                value: result.value,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Server settings could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

/**
 * @desc Get all customer app server settings
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_oc_server_settings = async (req, res, next) => {

    let settings = await OcServerSettings.find({}).catch(err => {
        console.log(err);
        res.send([]);
    });
    
    res.send(settings);

}

/**
 * @desc Get all customer app server settings
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_cust_app_server_settings = async (req, res, next) => {

    let settings = await CustAppServerSettings.find({}).catch(err => {
        console.log(err);
        res.send([]);
    });
    
    res.send(settings);

}

module.exports = {
    get_oc_server_settings,
    get_cust_app_server_settings,
    addOcServerSettings,
    addCustAppServerSettings
}