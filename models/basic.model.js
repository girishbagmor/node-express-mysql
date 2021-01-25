const db_connection = require('../config/db_connection');
const { promiseImpl } = require('ejs');

module.exports.insert = async(table, data, multiple = false) => {
    var qb = await db_connection.get_connection();

    if (multiple) {
        const results = qb.insert_batch(table, data);
        return true;
    } else {
        const results = await qb.insert(table, data);
        console.log(qb.last_query())
        return results.insertId;
    }
}

module.exports.update = async(table, data, where) => {
    var qb = await db_connection.get_connection();

    qb.update(table, data, where, (err, res) => {
        qb.release();
        if (err) return console.error(err);

        return true;
    });
}