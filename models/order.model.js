const Cart = require('./../helpers/cart');
const Model = require("../models/basic.model.js");
const QueryBuilder = require('../config/db_connection');
var dateFormat = require('dateformat');

module.exports.create_order = async(req) => {
    var post_data = req.body;

    var today = dateFormat('', "yyyy-mm-dd H:MM:ss");

    var order = {
        user_id: req.session.user_id,
        sub_total: Cart.total(req),
        shipping: 0,
        total: Cart.total(req),
        payment_method: post_data.payment_method,
        order_status_id: 1,
        created: today,
        updated: today,
    }
    console.log(order);
    return await Model.insert("orders", order);
}

module.exports.create_order_products = async(req, order_id) => {
    var cart = Cart.cart(req);

    var order_products = [];
    var i = 0;

    for (var key in cart) {
        order_products[i] = {
            order_id: order_id,
            product_id: cart[key].id,
            product_name: cart[key].name,
            price: cart[key].price,
            qty: cart[key].qty,
            gst: 0,
            sub_total: cart[key].qty * cart[key].price,
            archive: 0,
        }
    }

    return await Model.insert("order_products", order_products, true);
}

module.exports.create_order_address = async(req, order_id) => {
    var post_data = req.body;

    var today = dateFormat('', "yyyy-mm-dd H:MM:ss");

    var address = {
        order_id: order_id,
        firstname: post_data.firstname,
        lastname: post_data.firstname,
        phone: post_data.phone,
        email: post_data.email,
        address: post_data.address,
        address_line_2: post_data.address_line_2 ? post_data.address_line_2 : '',
        city: post_data.city,
        state: post_data.state,
        pincode: post_data.pincode,
        created: today,
        updated: today,
        archive: 0,
    }

    return await Model.insert("order_address", address, false);
}

module.exports.get_order_listing = async(req_data, options = {
    user_id: null,
}) => {
    return new Promise((resolve, reject) => {
        QueryBuilder.get_connection(qb => {
            qb.select(['SQL_CALC_FOUND_ROWS id', '_order as order_id', 'user_id', 'sub_total', 'shipping', 'total', 'payment_method', 'order_status_id', "created",
                "(select name from order_status where id = order_status_id) as status"
            ], false);

            //Ordering
            if (req_data['order'].length > 0) {
                var column_index = req_data['order'][0]['column'];
                var column_name = req_data['columns'][column_index]['data'];
                if (column_name === "order_date") {
                    column_name = "created";
                }

                qb.order_by(column_name, req_data["order"][0]["dir"])
            }

            // where user_id is not null
            if (options.user_id) {
                qb.where({ user_id: options.user_id });
            }

            qb.limit(req_data.length).offset(req_data.start)
            qb.get('orders', async(err, results) => {
                qb.release();

                results.map((val, index) => {
                    val.order_date = '<span title=' + dateFormat(val.created, "dd-mm-yyyy h:MM TT") + '>' + dateFormat(val.created, "dd-mm-yyyy") + '</span>';
                    val.actions = '<a class="" href="/user/order/' + val.id + '" >View</a>';
                    return val;
                })

                var qb_filtered_total = await QueryBuilder.get_connection();
                const filtered_total = await qb_filtered_total.query("SELECT FOUND_ROWS() as total");

                var res = {};
                res.data = results;
                res.recordsTotal = filtered_total[0].total;
                res.recordsFiltered = filtered_total[0].total;
                res.draw = req_data.draw;
                resolve(res);
            });
        });
    })
}