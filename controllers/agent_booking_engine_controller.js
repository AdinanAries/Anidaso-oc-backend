//models
const {
    AgentBookingEngine
} = require("../mongo_db_connections");


/**
 * @desc Create new Agent Booking Engine
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const add_agent_booking_engine = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            enableBookingEngine,
            showHeader,
            headerBg,
            headerCompanyTxtColor,
            showHeaderCompany,
            showHeaderMenu,
            headerMenuTxtColor,
            headerMenuIconColor,
            headerMenuActiveTxtColor,
            headerMenuActiveIconColor,
            actionButtonsBg,
            actionButtonsTxtColor,
            actionButtonsIconColor,
            closeButtonBgColor,
            closeButtonIconColor,
            showSearchFilters,
            searchFiltersTxtColor,
            searchFiltersIconColor,
            searchFiltersIndicatorColor,
            headerLogoBorderRadius,
            searchButtonBorderRadius,
            actionButtonBorderRadius,
            closeButtonBorderRadius,
            greetingsCardBg,
            greetingsCardTextColor,
            greetingsCardSecTextColor, 
            greetingsCardIconColor,
            greetingsCardTitleColor,
            greetingsCardBorderRadius,
            hideGreetingsCard,
            hideCompanyLogo,
            hideCompanyName,
            homePageSearchButtonTextColor,
            homePageSearchButtonBgColor,
            homePageSearchButtonIconColor,
            homePageSearchButtonBorderRadius,
            homePageSearchInputBackground,
            homePageSearchInputIconColor,
            homePageSearchInputBorderColor,
            homePageSearchInputborderRadius,
            homePageSearchInputTextColor,
            homePageSearchFormProductTypeSelectorActiveBackground,
            homePageSearchFormProductTypeSelectorBackground,
            homePageSearchFormProductTypeSelectorActiveTextColor,
            homePageSearchFormProductTypeSelectorTextColor,
            homePageSearchFormProductTypeSelectorActiveIcon,
            homePageSearchFormProductTypeSelectorIcon,
            homePageSearchFormProducttypeSelectorBorderRadius,
        } = req.body;

        if(!oc_user_id){
            res.status(400);
            res.send({message: "user-id field is required!"});
            return;
        }

        if(
            enableBookingEngine===undefined ||
            showHeader===undefined ||
            !headerBg ||
            !headerCompanyTxtColor ||
            showHeaderCompany===undefined ||
            showHeaderMenu===undefined ||
            !headerMenuTxtColor ||
            !headerMenuIconColor ||
            !headerMenuActiveTxtColor ||
            !headerMenuActiveIconColor ||
            !actionButtonsBg ||
            !actionButtonsTxtColor ||
            !actionButtonsIconColor ||
            !closeButtonBgColor ||
            !closeButtonIconColor ||
            showSearchFilters===undefined ||
            !searchFiltersTxtColor ||
            !searchFiltersIconColor ||
            !searchFiltersIndicatorColor ||
            headerLogoBorderRadius===undefined ||
            searchButtonBorderRadius===undefined ||
            actionButtonBorderRadius===undefined ||
            closeButtonBorderRadius===undefined ||
            !greetingsCardBg ||
            !greetingsCardTextColor ||
            !greetingsCardSecTextColor || 
            !greetingsCardIconColor ||
            !greetingsCardTitleColor ||
            greetingsCardBorderRadius===undefined ||
            hideGreetingsCard===undefined ||
            hideCompanyLogo===undefined ||
            hideCompanyName===undefined ||
            !homePageSearchButtonTextColor ||
            !homePageSearchButtonBgColor ||
            !homePageSearchButtonIconColor ||
            homePageSearchButtonBorderRadius===undefined ||
            !homePageSearchInputBackground ||
            !homePageSearchInputIconColor ||
            !homePageSearchInputBorderColor ||
            homePageSearchInputborderRadius===undefined ||
            !homePageSearchInputTextColor ||
            !homePageSearchFormProductTypeSelectorActiveBackground ||
            !homePageSearchFormProductTypeSelectorBackground ||
            !homePageSearchFormProductTypeSelectorActiveTextColor ||
            !homePageSearchFormProductTypeSelectorTextColor ||
            !homePageSearchFormProductTypeSelectorActiveIcon ||
            !homePageSearchFormProductTypeSelectorIcon ||
            homePageSearchFormProducttypeSelectorBorderRadius===undefined
        ){
            res.status(400);
            res.send({message: "all fields are required!"});
            return;
        }

        // Check if Booking Engine already exists for this agent
        let beExists = await AgentBookingEngine.findOne({
            oc_user_id,
        });

        if(beExists) {
            res.status(201);
            let __updated = await AgentBookingEngine.updateOne({
                _id: beExists?._id
            }, {
                enableBookingEngine,
                showHeader,
                headerBg,
                headerCompanyTxtColor,
                showHeaderCompany,
                showHeaderMenu,
                headerMenuTxtColor,
                headerMenuIconColor,
                headerMenuActiveTxtColor,
                headerMenuActiveIconColor,
                actionButtonsBg,
                actionButtonsTxtColor,
                actionButtonsIconColor,
                closeButtonBgColor,
                closeButtonIconColor,
                showSearchFilters,
                searchFiltersTxtColor,
                searchFiltersIconColor,
                searchFiltersIndicatorColor,
                headerLogoBorderRadius,
                searchButtonBorderRadius,
                actionButtonBorderRadius,
                closeButtonBorderRadius,
                greetingsCardBg,
                greetingsCardTextColor,
                greetingsCardSecTextColor, 
                greetingsCardIconColor,
                greetingsCardTitleColor,
                greetingsCardBorderRadius,
                hideGreetingsCard,
                hideCompanyLogo,
                hideCompanyName,
                homePageSearchButtonTextColor,
                homePageSearchButtonBgColor,
                homePageSearchButtonIconColor,
                homePageSearchButtonBorderRadius,
                homePageSearchInputBackground,
                homePageSearchInputIconColor,
                homePageSearchInputBorderColor,
                homePageSearchInputborderRadius,
                homePageSearchInputTextColor,
                homePageSearchFormProductTypeSelectorActiveBackground,
                homePageSearchFormProductTypeSelectorBackground,
                homePageSearchFormProductTypeSelectorActiveTextColor,
                homePageSearchFormProductTypeSelectorTextColor,
                homePageSearchFormProductTypeSelectorActiveIcon,
                homePageSearchFormProductTypeSelectorIcon,
                homePageSearchFormProducttypeSelectorBorderRadius,
            });
            if (__updated.matchedCount === 0) {
                // No document matching the filter was found
                console.log("Booking Engine was not found during update!");
                was_updated_status="Booking Engine was not found during update!";
                return
            } else if (__updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                console.log("Booking Engine already exists however failed on update!");
                was_updated_status="Booking Engine already exists however failed on update!";
                return;
            }else {
                // Getting updated record
                beExists = await AgentBookingEngine.findOne({
                    oc_user_id,
                });
                console.log("Booking Engine already exists and was updated!");
                was_updated_status="Booking Engine already exists and was updated!";
            }
            res.send({
                _id: beExists._id,
                oc_user_id: beExists.oc_user_id,
                enableBookingEngine: beExists.enableBookingEngine,
                showHeader: beExists.showHeader,
                headerBg: beExists.headerBg,
                headerCompanyTxtColor: beExists.headerCompanyTxtColor,
                showHeaderCompany: beExists.showHeaderCompany,
                showHeaderMenu: beExists.showHeaderMenu,
                headerMenuTxtColor: beExists.headerMenuTxtColor,
                headerMenuIconColor: beExists.headerMenuIconColor,
                headerMenuActiveTxtColor: beExists.headerMenuActiveTxtColor,
                headerMenuActiveIconColor: beExists.headerMenuActiveIconColor,
                actionButtonsBg: beExists.actionButtonsBg,
                actionButtonsTxtColor: beExists.actionButtonsTxtColor,
                actionButtonsIconColor: beExists.actionButtonsIconColor,
                closeButtonBgColor: beExists.closeButtonBgColor,
                closeButtonIconColor: beExists.closeButtonIconColor,
                showSearchFilters: beExists.showSearchFilters,
                searchFiltersTxtColor: beExists.searchFiltersTxtColor,
                searchFiltersIconColor: beExists.searchFiltersIconColor,
                searchFiltersIndicatorColor: beExists.searchFiltersIndicatorColor,
                headerLogoBorderRadius: beExists.headerLogoBorderRadius,
                searchButtonBorderRadius: beExists.searchButtonBorderRadius,
                actionButtonBorderRadius: beExists.actionButtonBorderRadius,
                closeButtonBorderRadius: beExists.closeButtonBorderRadius,
                greetingsCardBg: beExists.greetingsCardBg,
                greetingsCardTextColor: beExists.greetingsCardTextColor,
                greetingsCardSecTextColor: beExists.greetingsCardSecTextColor, 
                greetingsCardIconColor: beExists.greetingsCardIconColor,
                greetingsCardTitleColor: beExists.greetingsCardTitleColor,
                greetingsCardBorderRadius: beExists.greetingsCardBorderRadius,
                hideGreetingsCard: beExists.hideGreetingsCard,
                hideCompanyLogo: beExists.hideCompanyLogo,
                hideCompanyName: beExists.hideCompanyName,
                homePageSearchButtonTextColor: beExists.homePageSearchButtonTextColor,
                homePageSearchButtonBgColor: beExists.homePageSearchButtonBgColor,
                homePageSearchButtonIconColor: beExists.homePageSearchButtonIconColor,
                homePageSearchButtonBorderRadius: beExists.homePageSearchButtonBorderRadius,
                homePageSearchInputBackground: beExists.homePageSearchInputBackground,
                homePageSearchInputIconColor: beExists.homePageSearchInputIconColor,
                homePageSearchInputBorderColor: beExists.homePageSearchInputBorderColor,
                homePageSearchInputborderRadius: beExists.homePageSearchInputborderRadius,
                homePageSearchInputTextColor: beExists.homePageSearchInputTextColor,
                homePageSearchFormProductTypeSelectorActiveBackground: beExists.homePageSearchFormProductTypeSelectorActiveBackground,
                homePageSearchFormProductTypeSelectorBackground: beExists.homePageSearchFormProductTypeSelectorBackground,
                homePageSearchFormProductTypeSelectorActiveTextColor: beExists.homePageSearchFormProductTypeSelectorActiveTextColor,
                homePageSearchFormProductTypeSelectorTextColor: beExists.homePageSearchFormProductTypeSelectorTextColor,
                homePageSearchFormProductTypeSelectorActiveIcon: beExists.homePageSearchFormProductTypeSelectorActiveIcon,
                homePageSearchFormProductTypeSelectorIcon: beExists.homePageSearchFormProductTypeSelectorIcon,
                homePageSearchFormProducttypeSelectorBorderRadius: beExists.homePageSearchFormProducttypeSelectorBorderRadius,
                was_updated_status: was_updated_status,
            });
            return;
        }

        // Create new Agent Booking Engine
        const be = new AgentBookingEngine({
            oc_user_id,
            enableBookingEngine,
            showHeader,
            headerBg,
            headerCompanyTxtColor,
            showHeaderCompany,
            showHeaderMenu,
            headerMenuTxtColor,
            headerMenuIconColor,
            headerMenuActiveTxtColor,
            headerMenuActiveIconColor,
            actionButtonsBg,
            actionButtonsTxtColor,
            actionButtonsIconColor,
            closeButtonBgColor,
            closeButtonIconColor,
            showSearchFilters,
            searchFiltersTxtColor,
            searchFiltersIconColor,
            searchFiltersIndicatorColor,
            headerLogoBorderRadius,
            searchButtonBorderRadius,
            actionButtonBorderRadius,
            closeButtonBorderRadius,
            greetingsCardBg,
            greetingsCardTextColor,
            greetingsCardSecTextColor, 
            greetingsCardIconColor,
            greetingsCardTitleColor,
            greetingsCardBorderRadius,
            hideGreetingsCard,
            hideCompanyLogo,
            hideCompanyName,
            homePageSearchButtonTextColor,
            homePageSearchButtonBgColor,
            homePageSearchButtonIconColor,
            homePageSearchButtonBorderRadius,
            homePageSearchInputBackground,
            homePageSearchInputIconColor,
            homePageSearchInputBorderColor,
            homePageSearchInputborderRadius,
            homePageSearchInputTextColor,
            homePageSearchFormProductTypeSelectorActiveBackground,
            homePageSearchFormProductTypeSelectorBackground,
            homePageSearchFormProductTypeSelectorActiveTextColor,
            homePageSearchFormProductTypeSelectorTextColor,
            homePageSearchFormProductTypeSelectorActiveIcon,
            homePageSearchFormProductTypeSelectorIcon,
            homePageSearchFormProducttypeSelectorBorderRadius,
        });
        be.save().then((result) => {
            console.log(result)
            res.status(201).send({
                _id: result._id,
                oc_user_id: result.oc_user_id,
                enableBookingEngine: result.enableBookingEngine,
                showHeader: result.showHeader,
                headerBg: result.headerBg,
                headerCompanyTxtColor: result.headerCompanyTxtColor,
                showHeaderCompany: result.showHeaderCompany,
                showHeaderMenu: result.showHeaderMenu,
                headerMenuTxtColor: result.headerMenuTxtColor,
                headerMenuIconColor: result.headerMenuIconColor,
                headerMenuActiveTxtColor: result.headerMenuActiveTxtColor,
                headerMenuActiveIconColor: result.headerMenuActiveIconColor,
                actionButtonsBg: result.actionButtonsBg,
                actionButtonsTxtColor: result.actionButtonsTxtColor,
                actionButtonsIconColor: result.actionButtonsIconColor,
                closeButtonBgColor: result.closeButtonBgColor,
                closeButtonIconColor: result.closeButtonIconColor,
                showSearchFilters: result.showSearchFilters,
                searchFiltersTxtColor: result.searchFiltersTxtColor,
                searchFiltersIconColor: result.searchFiltersIconColor,
                searchFiltersIndicatorColor: result.searchFiltersIndicatorColor,
                headerLogoBorderRadius: result.headerLogoBorderRadius,
                searchButtonBorderRadius: result.searchButtonBorderRadius,
                actionButtonBorderRadius: result.actionButtonBorderRadius,
                closeButtonBorderRadius: result.closeButtonBorderRadius,
                greetingsCardBg: result.greetingsCardBg,
                greetingsCardTextColor: result.greetingsCardTextColor,
                greetingsCardSecTextColor: result.greetingsCardSecTextColor, 
                greetingsCardIconColor: result.greetingsCardIconColor,
                greetingsCardTitleColor: result.greetingsCardTitleColor,
                greetingsCardBorderRadius: result.greetingsCardBorderRadius,
                hideGreetingsCard: result.hideGreetingsCard,
                hideCompanyLogo: result.hideCompanyLogo,
                hideCompanyName: result.hideCompanyName,
                homePageSearchButtonTextColor: result.homePageSearchButtonTextColor,
                homePageSearchButtonBgColor: result.homePageSearchButtonBgColor,
                homePageSearchButtonIconColor: result.homePageSearchButtonIconColor,
                homePageSearchButtonBorderRadius: result.homePageSearchButtonBorderRadius,
                homePageSearchInputBackground: result.homePageSearchInputBackground,
                homePageSearchInputIconColor: result.homePageSearchInputIconColor,
                homePageSearchInputBorderColor: result.homePageSearchInputBorderColor,
                homePageSearchInputborderRadius: result.homePageSearchInputborderRadius,
                homePageSearchInputTextColor: result.homePageSearchInputTextColor,
                homePageSearchFormProductTypeSelectorActiveBackground: result.homePageSearchFormProductTypeSelectorActiveBackground,
                homePageSearchFormProductTypeSelectorBackground: result.homePageSearchFormProductTypeSelectorBackground,
                homePageSearchFormProductTypeSelectorActiveTextColor: result.homePageSearchFormProductTypeSelectorActiveTextColor,
                homePageSearchFormProductTypeSelectorTextColor: result.homePageSearchFormProductTypeSelectorTextColor,
                homePageSearchFormProductTypeSelectorActiveIcon: result.homePageSearchFormProductTypeSelectorActiveIcon,
                homePageSearchFormProductTypeSelectorIcon: result.homePageSearchFormProductTypeSelectorIcon,
                homePageSearchFormProducttypeSelectorBorderRadius: result.homePageSearchFormProducttypeSelectorBorderRadius,
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Booking Engine could not be created'});
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
const _____getWalletByID = (req, res, next) => {
    try{
        const id=req.params.id;
        AgentBookingEngine.findOne({_id: id}).then(async(wallet) => {
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
 * @desc Get Booking Engine of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Public
 */
const get_booking_engine_of_agent = async (req, res, next) => {

    try{
        const oc_user_id = req.params.oc_user_id;

        if(!oc_user_id){
            res.status(400);
            res.send({message: "user-id field is required!"});
            return;
        }

        let be = await AgentBookingEngine.findOne({oc_user_id}).catch(err => {
            console.log(err);
            res.send([]);
        });
        
        res.send(be);

    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

module.exports = {
    add_agent_booking_engine,
    get_booking_engine_of_agent
}