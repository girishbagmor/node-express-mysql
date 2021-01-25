const { Validator } = require('node-input-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Common = require("../helpers/common.js");
const session = require('express-session');

module.exports.check_login = async function(req, res) {
    var valid = new Validator(req.body, {
        email: "required|email",
        password: "required"
    })

    var is_valid = await valid.check();

    if (!is_valid) {
        req.flash('errors', Common.string_errors(valid.errors));
        return res.redirect('/login');
    }

    var post_data = req.body;

    User.check_login(post_data.email).then((resonse) => {
        if (resonse.status) {
            var user = resonse.data;

            if (user.length === 0) {
                req.flash('errors', "Email or password does not match");
                return res.redirect('/login');
            }

            const comparision = bcrypt.compare(post_data.password, user[0].password)
            if (comparision) {

                req.session.fullname = user[0].firstname + ' ' + user[0].lastname;
                req.session.firstname = user[0].firstname;
                req.session.lastname = user[0].lastname;
                req.session.email = user[0].email;
                req.session.user_id = user[0].id;
                req.session.isUserLoggedIn = true;

                req.session.save();

                return res.redirect('/');
            } else {
                req.flash({ "errors": "Email or password does not match" })
            }
        } else {
            req.flash('errors', resonse.msg);
            return res.redirect('/login');
        }
    });
}