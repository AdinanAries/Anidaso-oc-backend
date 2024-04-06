// models
// will go here

const get_notifications = (req, res, next) => {
    //get notifications from database here
    console.log("notifications skip: ", req.params.skip);
    console.log("notifications limit: ", req.params.limit);
    res.send(["one", "two", "three", "four"]);
}

module.exports = {
    get_notifications,
}