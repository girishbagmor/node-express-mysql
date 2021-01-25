const Product = require('./../models/product.model');
const Order = require('./../models/order.model');
const Cart = require('./../helpers/cart');
const { Validator } = require('node-input-validator');
const Common = require("../helpers/common.js");

module.exports.order_checkout = async(req, res) => {
    var valid = new Validator(req.body, {
        firstname: "required",
        lastname: "required",
        phone: "required",
        email: "required|email",
        address: "required",
        city: "required",
        state: "required",
        pincode: "required",
    })

    var is_valid = await valid.check();

    if (!is_valid) {
        req.flash('errors', Common.string_errors(valid.errors));
        return res.redirect('/checkout');
    }

    var order_id = await Order.create_order(req);

    if (order_id > 0) {

        Order.create_order_products(req, order_id);

        Order.create_order_address(req, order_id);
    } else {
        return res.redirect('pages/order_failed');
    }

    var encypted = Common.encrypt(order_id + '');
    Cart.destroy(req);

    res.redirect('/order_success/' + encypted);
}

module.exports.order_success = async(req, res) => {


    res.render('pages/order_success', { order_id: 1 });
}

module.exports.order_failed = async(req, res) => {

}