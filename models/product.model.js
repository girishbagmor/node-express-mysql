const QueryBuilder = require('../config/db_connection');

module.exports.fetured_product = async function() {
    return new Promise((resolve, reject) => {
        QueryBuilder.get_connection(qb => {
            qb.select(['id', 'name', 'price', 'description', 'category_id', '(select path from product_images pi where product_id = p.id and featured_image = 1 and archive = 0 limit 1) as featured_image'])
                .from("products as p")
                .limit(6)
                .get((error, results) => {
                    if (error) {
                        console.log(error)
                        throw error;
                    } else {
                        resolve(results);
                    }
                })
        })
    })
}

module.exports.get_product_details = function(product_id) {
    return new Promise((resolve, reject) => {

        QueryBuilder.get_connection(qb => {
            qb.select(['id', 'name', 'price', 'description', 'category_id'])
                .where({ archive: 0, 'id': product_id })
                .get('products', (err, product) => {
                    qb.release();

                    if (product.length > 0) {
                        QueryBuilder.get_connection(qb => {
                            qb.select(["id", "filename", "path"])
                                .where({ product_id: product_id, archive: 0 })
                                .get('product_images', (err, product_images) => {

                                    var res = product[0];
                                    res['product_images'] = product_images;

                                    resolve(res);
                                })
                        });
                    } else {
                        resolve(false);
                    }
                });
        });
    })
}

module.exports.get_product_feature_images = async function(product_id) {
    const qb = await QueryBuilder.get_connection();
    const response = await qb.select(['id', 'filename', 'path'])
        .where({ featured_image: 1, 'product_id': product_id })
        .get('product_images');

    if (response.length > 0) {
        return response[0].path;
    } else {
        return false;
    }
}

module.exports.get_product_of_shop_page = async function() {
    return new Promise((resolve, reject) => {
        QueryBuilder.get_connection(qb => {
            qb.select(['id', 'name', 'price', 'description', 'category_id', '(select path from product_images pi where product_id = p.id and featured_image = 1 and archive = 0 limit 1) as featured_image'])
                .from("products as p")
                .limit(40)
                .get((error, results) => {
                    if (error) {
                        console.log(error)
                        throw error;
                    } else {
                        resolve(results);
                    }
                })
        })
    })
}