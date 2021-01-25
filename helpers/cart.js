var Common = require("../helpers/common");

module.exports.add = (req, item) => {
    if (item.id && item.name && item.price && item.qty) {

        var encryptedString = Common.encrypt(item.id + '');

        var ar_item = req.session.cart || {};

        item.sub_total = parseInt(item.qty) * parseInt(item.price);

        ar_item[encryptedString] = item;
        ar_item[encryptedString]["row_id"] = encryptedString;

        req.session.cart = ar_item;
        req.session.save();
        return encryptedString;
    } else {
        return false;
    }
}

module.exports.remove = (req, row_id) => {
    var cart = this.cart(req);

    if (cart[row_id]) {
        cart[row_id] = undefined;
        req.session.cart = cart;

        return true;
    } else {
        return false;
    }
}

const cart = (req) => {
    return req.session.cart || {};
}

module.exports.cart = cart;

module.exports.update = (req, item_details) => {
    item_details.qty = parseInt(item_details.qty || 0);
    if (!item_details.row_id) {
        return false;
    }

    var cart = this.cart(req);

    if (!cart[item_details.row_id]) {
        return false;
    } else if (item_details.qty > 0) {

        cart[item_details.row_id].qty = parseInt(item_details.qty);
        req.session.cart = cart;
        return true;
    } else {
        this.remove(req, item_details.row_id);
    }
}

module.exports.total = (req) => {
    var cart = this.cart(req);

    total = 0;
    for (var key in cart) {
        total += cart[key].qty * cart[key].price;
    }

    return total;
}

module.exports.destroy = (req) => {
    req.session.cart = {};

    return true;
}