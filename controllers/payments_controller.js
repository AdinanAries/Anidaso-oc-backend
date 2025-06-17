const stripe = require('stripe')(process.env.STRIPE_SECRETE);

/**
 * @desc Creates new Stripe subscription
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const create_subscription = async (req, res, next) => {

    try {

        const {
            paymentMethodId, 
            customerEmail,
            welldugo_product_constant_number
        } = req.body;

        if(!paymentMethodId) {
            res.status(400);
            res.send({message: "Payment method id is required!"});
            return;
        }

        if(!customerEmail) {
            res.status(400);
            res.send({message: "Customer email is required!"});
            return;
        }

        if(!welldugo_product_constant_number) {
            res.status(400);
            res.send({message: "Product constant number is required!"});
            return;
        }


        const product_price_ids = [
            "price_1RZxUMAn0YMgH2TtKZWcx6Vk", // Basic Tier => 2 - 2 = 0
            "price_1RZxVVAn0YMgH2TtnLFPoUgW" // Advanced Tier => 3 - 2 = 1
        ]

        // Create a customer
        const customer = await stripe.customers.create({
            email: customerEmail,
            payment_method: paymentMethodId,
            invoice_settings: { default_payment_method: paymentMethodId },
        });

        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ price:  product_price_ids[(parseInt(welldugo_product_constant_number) - 2)]}],
            expand: ['latest_invoice.payment_intent'],
        });

        res.json(subscription);

    } catch (error) {
        res.status(400).send({ error: { message: error.message } });
    }

};

/**
 * @desc Creates Strip Payment Intent
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const create_payment_intent = async (req, res, next) => {
    try {
        const { 
            amount, 
            currency 
        } = req.body;

        const strp_amount = (parseFloat(amount)*100);

        // Create a PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: strp_amount, // Amount in cents (e.g., $10.00 = 1000)
            currency, // e.g., 'usd'
            payment_method_types: ['card'], // Specify payment methods
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret, // Send client secret to the client
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

/**
 * @desc Getting Strip Customer by Email
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_stripe_customer_by_email = async (req, res, next) => {

    try {
        
        const {
            email,
        } = req.body;

        const customers = await stripe.customers.list({
            email: email,
            limit: 1, // Assuming only one customer per email
        });

        if (customers.data.length > 0) {
            res.status(200).send(customers.data[0]);
            return;
        } else {
            res.status(200).send({});
            return; // Customer not found
        }
        
    } catch (error) {
        res.status(400).send({ error: { message: error.message } });
    }
};

/**
 * @desc Getting Stripe Subscriptions by Customer-Id
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const get_stripe_subscriptions_by_customer_id = async (req, res, next) => {

    try {
        const {
            customer,
        } = req.body;

        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'all', // To retrieve all subscriptions including canceled ones, otherwise use 'active'
        });

        res.status(200).send(subscriptions.data);
        return;
    } catch (error) {
        res.status(400).send({ error: { message: error.message } });
    }
};

module.exports = {
    create_subscription,
    create_payment_intent,
    get_stripe_customer_by_email,
    get_stripe_subscriptions_by_customer_id,
}