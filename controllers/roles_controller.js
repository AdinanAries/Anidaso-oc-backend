const {
    UserRole,
    RolePrivilege,
    ApplicationPage,
    ApplicationResource,
    ApplicationResourceType,
    CanAction,
} = require('../mongo_db_connections'); 

/**
 * @desc Get All User Roles
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getUserRoles = (req, res, next) => {
    UserRole.find({})
    .then((roles) => {
        res.status(200).send(roles);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }); 
}

/**
 * @desc Get All Role Privilege Actions
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getCanActionsByResourceType = (req, res, next) => {
    try{
        const {
            resource_type_id
        } = req.params;
        CanAction.find({resource_type_id}).then((can_actions) => {
            res.status(200).send(can_actions);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({message: "Server Error"});
        }); 
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

/**
 * @desc Get Role By Constant
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getUserRoleByConstant = (req, res, next) => {
    let c = req?.params?.role_constant;
    UserRole.findOne({constant: c})
    .then((role) => {
        res.status(200).send(role);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }); 
}

/**
 * @desc Get All Application Pages
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getAppPages = (req, res, next) => {
    try {
        ApplicationPage.find({})
        .then((pages) => {
            res.status(200).send(pages);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({message: "Server Error"});
        }); 
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

/**
 * @desc Get All Application Resources
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getAppResources = (req, res, next) => {
    try{
        ApplicationResource.find({})
        .then((resources) => {
            res.status(200).send(resources);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({message: "Server Error"});
        }); 
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

/**
 * @desc Get Role Privilege by ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getRolePrivilege = (req, res, next) => {
    RolePrivilege.findOne({_id: req?.params?.id})
    .then((privilege) => {
        res.status(200).send(privilege);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }); 
}

/**
 * @desc Creates New Role Privilege
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const CreateNewPrivilege = async (req, res, next) => {
    try{
        const {
            description,
            pagesCanAccess,
            resourcesCanActions,
        } = req.body;

        if(!description){
            res.status(400);
            res.send({message: "Please add privilege description"});
        }
        // Check if privilege exists
        const privExists = await RolePrivilege.findOne({description});

        if(privExists) {
            res.status(400);
            res.send({message: "Privilege with same description already exist"});
            return;
        }

        // Create privilege
        const user = new RolePrivilege({
            description: description,
            pagesCanAccess: pagesCanAccess,
            resourcesCanActions: resourcesCanActions,
        });
        user.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                description: result.description,
                pagesCanAccess: result.pagesCanAccess,
                resourcesCanActions: result.resourcesCanActions
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Privilege could not be created'});
        });
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

/**
 * @desc Get Application Resource Type by ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getAppResourceType = (req, res, next) => {
    ApplicationResourceType.findOne({_id: req?.params?.id})
    .then((app_resource_type) => {
        res.status(200).send(app_resource_type);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }); 
}

module.exports = {
    getUserRoles,
    getUserRoleByConstant,
    getRolePrivilege,
    getAppPages,
    getAppResources,
    getAppResourceType,
    getCanActionsByResourceType,
    CreateNewPrivilege,
}