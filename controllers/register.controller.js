const NodeValidator = require('node-input-validator');
const bcrypt = require('bcrypt');
const Common = require("../helpers/common.js");
const Model = require("../models/basic.model.js");
const QueryBuilder = require('../config/db_connection');

module.exports.register = async function(req, res) {

    const v = new NodeValidator.Validator(req.body, {
        firstname: 'required',
        lastname: 'required',
        email: 'required|email|unique:users,email',
        password: 'required',
    });

    const matched = await v.check();

    if (!matched) {
        req.flash('errors', Common.string_errors(v.errors));
        return res.redirect('register');
    }

    var today = new Date();
    var post_data = req.body;


    const encryptedString = bcrypt.hashSync(post_data.password, 10);

    var users = {
        "firstname": post_data.firstname,
        "lastname": post_data.lastname,
        "email": post_data.email,
        "password": encryptedString,
        "created": today,
        "updated": today
    }

    var user_id = await Model.insert("users", users, false);
    if (user_id > 0) {
        req.flash('success', "Registered successfully.");
        return res.redirect('register');
    } else {
        req.flash('errors', resonse.msg);
        return res.redirect('register');
    }


}

NodeValidator.extend('unique', async({ value, args }) => {
    // default field is email in this example
    const field = args[1] || 'email';

    let condition = {};
    condition[field] = value;

    const qb = await QueryBuilder.get_connection();
    const response = await qb.select(field)
        .where(condition)
        .get(args[0]);

    // email already exists
    if (response.length > 0) {
        return false;
    }

    return true;
});