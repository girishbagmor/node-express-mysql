const Product = require("../models/product.model");

module.exports.home_page = function(req, res) {
    Product.fetured_product().then((result) => {
        res.render('pages/index', { fetured_products: result })
    });
}