const Product = require('./../models/product.model');
const Cart = require('./../helpers/cart');
const { Validator } = require('node-input-validator');
const Common = require("../helpers/common.js");
var dateFormat = require('dateformat');

module.exports.add_to_cart = (req, res) => {
    var post_data = req.body;

    Product.get_product_details(post_data.product_id).then((product) => {
        if (product) {
            var item = {
                id: product.id,
                name: product.name,
                qty: post_data.qty || 1,
                price: product.price,
            }

            var variation_id = Cart.add(req, item);

            if (variation_id) {
                res.status(200).json({ status: false, msg: "Added in cart" });
            } else {
                res.status(422).json({ status: false, msg: "Not added due to techinal problem" });
            }
        } else {
            res.status(404).json({ status: false, msg: "Product not found" });
        }
    })
}

module.exports.cart_page = async function(req, res) {
    var cart = Cart.cart(req)

    for (const key in cart) {
        var product_id = cart[key].id;

        cart[key]["featured_image"] = await Product.get_product_feature_images(product_id)
    }

    res.render('pages/cart', { cart, cart })
}

module.exports.update_cart = (req, res) => {
    var post_data = req.body;

    if (post_data.item) {
        var post_cart = post_data.item
        for (const key in post_cart) {
            var row_id = key;
            var qty = post_cart[key];

            Cart.update(req, { row_id: row_id, qty: qty });
        }
    }

    res.redirect("/cart");
}

module.exports.checkout_page = (req, res) => {
    var cart = Cart.cart(req)

    if (Object.keys(cart).length === 0) {
        return res.redirect("/cart");
    }
    console.log(req.session.isUserLoggedIn);
    if (!req.session.isUserLoggedIn) {
        return res.redirect("/login");
    }

    var sub_total = Cart.total(req)
    res.render('pages/checkout', { cart: cart, sub_total: sub_total, expressFlash: req.flash() })
}