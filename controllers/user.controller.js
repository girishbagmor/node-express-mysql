const User = require('./../models/user.model');
const Order = require('./../models/order.model');
const Model = require('./../models/basic.model');

module.exports.logout = (req, res) => {
    req.session.isUserLoggedIn = false;

    res.redirect('/')
}

module.exports.profile_view = (req, res) => {
    var user_id = req.session.user_id;

    User.get_user_details(user_id).then((user_details) => {

        res.render('pages/users/user_profile', user_details);
    })
}

module.exports.update_profile = (req, res) => {
    var post_data = req.body;
    var user_id = req.session.user_id;

    var updated_data = {
        firstname: post_data.firstname,
        lastname: post_data.lastname,
        email: post_data.email,
        phone: post_data.phone,
        gender: post_data.gender,
    }

    Model.update("users", updated_data, { id: user_id });
    res.redirect("/user/profile")
}

module.exports.order_history = (req, res) => {
    res.render('pages/users/order_history');
}

module.exports.order_history_listing = (req, res) => {
    var user_id = req.session.user_id;

    Order.get_order_listing(req.body, { user_id }).then((orders) => {

        res.json(orders);
    })
}