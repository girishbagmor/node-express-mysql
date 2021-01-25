const express = require("express");
const app = new express();
var router = express.Router();
var User = require("../controllers/user.controller");

// user account routes //
router.get("/", authRequire, (req, res) => {
    res.render('pages/users/account_details')
})

router.get("/order", authRequire, User.order_history)

router.get("/profile", User.profile_view);
router.post("/update_profile", User.update_profile);
router.post("/order_history_listing", User.order_history_listing);

router.get("/logout", User.logout)

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