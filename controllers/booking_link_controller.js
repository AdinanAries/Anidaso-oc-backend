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
        const user_id = req.params.oc_user_id;
        let offset = parseInt(req.params.offset);
        --offset; //offset starts from 0 as of array indexes
        let limit = parseInt(req.params.limit);

        if(!user_id){
            res.status(400);
            res.send({message: "oc_user_id field is required!"});
            return;
        }

        let total_items = await BookingLink.count({oc_user_id: user_id}).catch(err => {
            console.log(err);
            res.send([]);
        });

        res.set("Pagination-Total-Items", total_items);

        let booking_links = await BookingLink.find({oc_user_id: user_id}).sort({ _id: -1 }).skip((offset)).limit(limit).catch(err => {
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
        const linkExists = await BookingLink.findOne({
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
            }, {
                profit_type_value,
                visited,
                booked
            });
            console.log(__updated)
            res.send(__updated);
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
                booked: result.booked
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