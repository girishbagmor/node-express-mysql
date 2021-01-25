const Product = require("../models/product.model");

module.exports.product_details = function(req, res) {
    Product.get_product_details(req.params.id).then((product) => {

        if (Object.keys(product).length > 0) {
            // console.log(product);
            res.render('pages/product_details', product)
        } else {
            res.redirect('/404')
        }
    })
}

module.exports.shop_page = function(req, res) {
    Product.get_product_of_shop_page().then((products) => {

        res.render('pages/shop', { products: products })
    })
}