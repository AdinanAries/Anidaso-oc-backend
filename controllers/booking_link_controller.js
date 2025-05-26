//models
const {
    BookingLink
} = require("../mongo_db_connections");

/**
 * @desc Get all Booking Link of Agent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_agent_booking_links = async (req, res, next) => {

    try{

        const {
            product,
            trip_round,
            origin_airport,
            destination_airport,
            time_intervals,
        } = req.body?.filters;

        const user_id = req.params.oc_user_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        if(!user_id){
            res.status(400);
            res.send({message: "oc_user_id field is required!"});
            return;
        }

        const search_obj = {
            oc_user_id: user_id
        }

        // Adding Filters
        if(product!==undefined && parseInt(product)!==-1){
            search_obj.product = product;
        }

        if(trip_round && trip_round!=="all"){
            search_obj.trip_type = trip_round;
        }

        if(origin_airport){

        }

        if(destination_airport){

        }

        if(time_intervals){

        }

        let total_items = await BookingLink.count(search_obj).catch(err => {
            console.log(err);
            res.send([]);
        });

        res.set("Pagination-Total-Items", total_items);

        let booking_links = await BookingLink.find(search_obj).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
            console.log(err);
            res.send([]);
        });
        
        res.send(booking_links);
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
}

/**
 * @desc Create new Booking Link
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const addBookingLink = async (req, res, next) => {
    try{
        const {
            oc_user_id,
            client_app_url,
            product,
            trip_type,
            departure_airport,
            destination_airport,
            travel_dates,
            cabin,
            num_of_adults,
            num_of_children,
            num_of_infants,
            data_provider,
            profit_type,
            profit_type_value,
            visited,
            booked
        } = req.body;

        let was_updated_status="";

        if(!oc_user_id){
            res.status(400);
            res.send({message: "user-id field is required!"});
            return;
        }

        if(
            !client_app_url ||
            product===undefined ||
            !trip_type ||
            !departure_airport ||
            !destination_airport ||
            !travel_dates ||
            !cabin ||
            !num_of_adults ||
            !data_provider ||
            !profit_type ||
            profit_type_value===undefined
        ){
            res.status(400);
            res.send({message: "all fields fields are required!"});
            return;
        }

        // Check if booking link exists
        let linkExists = await BookingLink.findOne({
            oc_user_id,
            client_app_url,
            product,
            trip_type,
            departure_airport,
            destination_airport,
            travel_dates,
            cabin,
            num_of_adults,
            num_of_children,
            num_of_infants,
            data_provider,
            profit_type,
        });

        if(linkExists) {
            res.status(201);
            let __updated = await BookingLink.updateOne({
                _id: linkExists?._id
            }, {
                profit_type_value,
            });
            if (__updated.matchedCount === 0) {
                // No document matching the filter was found
                console.log("Booking link was not found during update!");
                was_updated_status="Booking link was not found during update!";
                return
            } else if (__updated.modifiedCount === 0) {
                // A document was matched, but not modified (e.g., the update didn't change any values)
                console.log("Booking link already exists however failed on update!");
                was_updated_status="Booking link already exists however failed on update!";
                return;
            }else {
                console.log("Booking link already exists and was updated!");
                was_updated_status="Booking link already exists and was updated!";
                // Fetching new updated record
                linkExists = await BookingLink.findOne({_id: linkExists?._id});
            }
            res.send({
                _id: linkExists._id,
                oc_user_id: linkExists.oc_user_id,
                client_app_url: linkExists.client_app_url,
                product: linkExists.product,
                trip_type: linkExists.trip_type,
                departure_airport: linkExists.departure_airport,
                destination_airport: linkExists.destination_airport,
                travel_dates: linkExists.travel_dates,
                cabin: linkExists.cabin,
                num_of_adults: linkExists.num_of_adults,
                num_of_children: linkExists.num_of_children,
                num_of_infants: linkExists.num_of_infants,
                data_provider: linkExists.data_provider,
                profit_type: linkExists.profit_type,
                profit_type_value: linkExists.profit_type_value,
                visited: linkExists.visited,
                booked: linkExists.booked,
                was_updated_status: was_updated_status,
            });
            return;
        }

        // Create new booking link
        const booking_link = new BookingLink({
            oc_user_id,
            client_app_url,
            product,
            trip_type,
            departure_airport,
            destination_airport,
            travel_dates,
            cabin,
            num_of_adults,
            num_of_children,
            num_of_infants,
            data_provider,
            profit_type,
            profit_type_value,
            visited,
            booked
        });
        booking_link.save().then((result) => {
            console.log(result)
            res.status(201).send({
                _id: result._id,
                oc_user_id: result.oc_user_id,
                client_app_url: result.client_app_url,
                product: result.product,
                trip_type: result.trip_type,
                departure_airport: result.departure_airport,
                destination_airport: result.destination_airport,
                travel_dates: result.travel_dates,
                cabin: result.cabin,
                num_of_adults: result.num_of_adults,
                num_of_children: result.num_of_children,
                num_of_infants: result.num_of_infants,
                data_provider: result.data_provider,
                profit_type: result.profit_type,
                profit_type_value: result.profit_type_value,
                visited: result.visited,
                booked: result.booked,
                was_updated_status: "new document was created"
            });
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.send({message: 'Booking link could not be created'});
        });
    }catch(e){
        console.log(e);
        res.status(500);
        res.send({message: "Server error"});
    }
};

module.exports = {
    addBookingLink,
    get_agent_booking_links,
}