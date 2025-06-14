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
 * @desc Processes Strip Payment
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @access Protected
 */
const process_payment = async (req, res, next) => {

};

module.exports = {
    create_subscription,
    process_payment,
}