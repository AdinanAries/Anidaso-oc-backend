const {
    User,
    AgentInfo,
    UserRole
} = require('../mongo_db_connections'); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

/**
 * @desc Registers new user
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Public
 */
const signup = asyncHandler(async (req, res, next) => {
    try{
        const {
            password,
            first_name,
            middle_name,
            last_name,
            dob,
            gender,
            phone,
            email
        } = req.body;

        if(!first_name || !last_name || !email || !password || !phone ){
            res.status(400);
            res.send({message: "Please add mandatory user fields"});
        }

        // Check if user exists
        const userExists = await User.findOne({email});

        if(userExists) {
            res.status(400);
            res.send({message: "User already exist"});
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = new User({
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
            dob: dob,
            gender: gender,
            phone: phone,
            email: email,
            password: hashedPassword,
            make_new_password: true
        });
        user.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                first_name: result.first_name,
                middle_name: result.middle_name,
                last_name: result.last_name,
                dob: result.dob,
                phone: result.phone,
                email: result.email,
                gender: result.gender,
                password: result.password,
                make_new_password: result.make_new_password,
                token: generateToken(result._id)
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'User could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
});

/**
 * @desc User login
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Public
 */
const login = asyncHandler(async (req, res, next) => {
    try{
        const {email, password } = req.body;

        if(!email || !password){
            res.status(400);
            res.send({isError: true, message: "Please provide user credentials"});
        }

        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password, user.password))){
            // Getting User Role
            let role_info={}
            if(user?.role_id){
                role_info = await UserRole.findOne({_id: user?.role_id});
            }

            res.status(201).send({
                _id: user._id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                dob: user.dob,
                phone: user.phone,
                email: user.email,
                gender: user.gender,
                password: user.password,
                make_new_password: user.make_new_password,
                role_id: user?.role_id,
                role_info: role_info,
                token: generateToken(user._id)
            });
        }else{
            res.status(400);
            res.send({isError: true, message: "Invalid Login Credentials"});
        }
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({isError: true, message: "Server error"});
        //throw new Error("Server error");
    }
})

/**
 * @desc Get Currently Logged-In User Information
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getUserDetails = (req, res, next) => {
    const id=req.user.id;
    User.findOne({_id: id})
    .then(async(user) => {
        // Getting User Role
        let role_info={}
        if(user?.role_id){
            role_info = await UserRole.findOne({_id: user?.role_id});
        }

        res.status(200).send({
            _id: user._id,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            dob: user.dob,
            phone: user.phone,
            email: user.email,
            password: user.password,
            make_new_password: user.make_new_password,
            role_id: user?.role_id,
            role_info: role_info,
            token: generateToken(user._id)
        });
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }); 
}

/**
 * @desc Get User By ID
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getUserDetailsByID = (req, res, next) => {
    try{
        const id=req.params.id;
        User.findOne({_id: id}).then(async(user) => {
            // Getting User Role
            let role_info={}
            if(user?.role_id){
                role_info = await UserRole.findOne({_id: user?.role_id});
            }

            res.status(200).send({
                _id: user._id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                dob: user.dob,
                phone: user.phone,
                email: user.email,
                gender: user.gender,
                password: user.password,
                role_id: user?.role_id,
                make_new_password: user?.make_new_password,
                role_info: role_info,
                token: generateToken(user._id)
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
 * @desc Get Agent User information, if user has role of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const getAgentInfo = (req, res, next) => {
    const user_id=req.user.user_id;
    AgentInfo.findOne({_id: user_id})
    .then((agent_info) => {
        res.status(200).send(agent_info);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }); 
}

/**
 * @desc Updating user account information
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const updateUserDetails = asyncHandler( async (req, res, next) => {
    try{
        const {
            password,
            first_name,
            middle_name,
            last_name,
            dob,
            gender,
            phone,
            email,
            role_id,
            make_new_password,
        } = req.body;

        if(!first_name || !last_name || !email || !role_id || !gender){
            res.status(400);
            res.send({message: 'Please add mandatory user fields'});
            return;
        }

        // Check if user exists
        const user = await User.findById(req.user.id);

        if(!user) {
            res.status(400);
            res.send({message: 'User does not exist'});
            return;
        }

        // Update user
        user.first_name=first_name;
        user.middle_name=middle_name;
        user.last_name=last_name;
        user.dob=dob;
        user.gender=gender;
        user.phone=phone;
        user.email=email;
        user.role_id=role_id;
        user.password=password;
        user.make_new_password=make_new_password;

        const user_updated = new User(user);
        user_updated.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                first_name: result.first_name,
                middle_name: result.middle_name,
                last_name: result.last_name,
                dob: result.dob,
                phone: result.phone,
                email: result.email,
                gender: result.gender,
                role_id: result.role_id,
                make_new_password: result.make_new_password,
                password: result.password,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'User could not be updated'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
});

/**
 * @desc Changes user password
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 * @access Private
 */
const updateUserPassword = asyncHandler( async (req, res, next) => {
    try{
        const {
            new_password,
            old_password,
            first_name,
            middle_name,
            last_name,
            dob,
            gender,
            phone,
            email
        } = req.body;

        console.log("here", req.body);

        if(!new_password || !old_password){
            res.status(400);
            res.send({message: "Either your old password or the new one or both are have not been provided"});
            return;
        }

        if(!first_name || !last_name || !email ){
            res.status(400);
            res.send({message: 'Please add mandatory user fields'});
            return;
        }

        // Check if user exists
        const user = await User.findById(req.user.id);

        if(!user) {
            res.status(400);
            res.send({message: 'User does not exist'});
            return;
        }

        if((await bcrypt.compare(old_password, user.password))){
            // old password is correct!
            if((await bcrypt.compare(new_password, user.password))){
                res.status(400);
                res.send({message: "Both old and new passwords are the same"});
                return;
            }
        } else {
            res.status(400);
            res.send({message: 'Please make sure your old password is correct'});
            return;
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);

        // Update user password
        user.password=hashedPassword;
        user.make_new_password=false;

        const user_updated = new User(user);
        user_updated.save().then((result) => {
            console.log(result);
            res.status(201).send({
                _id: result._id,
                first_name: result.first_name,
                middle_name: result.middle_name,
                last_name: result.last_name,
                dob: result.dob,
                phone: result.phone,
                email: result.email,
                role_id: result.role_id,
                make_new_password: result.make_new_password,
                password: result.password,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Password could not be changed'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRETE, {
        expiresIn: "14d"
    });
}

module.exports = {
    getUserDetails,
    getUserDetailsByID,
    getAgentInfo,
    login,
    signup,
    updateUserDetails,
    updateUserPassword,
}