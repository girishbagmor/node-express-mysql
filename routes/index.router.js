const db_connection = require('./../config/db_connection');
const Register = require('./../controllers/register.controller');
const Auth = require('./../controllers/auth.controller');
const Home = require('./../controllers/home.controller');
const Cart = require('./../controllers/cart.controller');
const Product = require('./../controllers/product.controller');
const Order = require('./../controllers/order.controller');

const express = require("express");
var router = express.Router();

router.get("/", Home.home_page)

router.get("/register", authRestrict, (req, res) => {
    res.render('pages/register', { expressFlash: req.flash() })
})

router.post("/register_user", Register.register)

router.get("/login", authRestrict, (req, res) => {
    res.render('pages/login', { expressFlash: req.flash() })
})

router.post("/login", Auth.check_login)

router.get("/contact", (req, res) => {
    res.render('pages/contact')
})

router.get("/about", (req, res) => {
    res.render('pages/about')
})

router.get("/shop", Product.shop_page)

router.get("/cart", Cart.cart_page);
router.post("/update_cart", Cart.update_cart);

router.post("/add_to_cart", Cart.add_to_cart)

router.get("/checkout", Cart.checkout_page)
router.post("/order_checkout", Order.order_checkout)
router.get("/order_success/:id", Order.order_success)
router.get("/order_failed", Order.order_failed)

router.get("/product/details/:id", Product.product_details)

function authRequire(req, res, next) {
    if (req.session.isUserLoggedIn) {
        next();
    } else {
        return res.redirect('/login');
    }
}

function authRestrict(req, res, next) {
    if (!req.session.isUserLoggedIn) {
        next();
    } else {
        return res.redirect('/user');
    }
}

module.exports = router;