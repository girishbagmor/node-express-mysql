const QueryBuilder = require('../config/db_connection');

module.exports.check_login = (email) => {
    return new Promise((resolve, reject) => {

        QueryBuilder.get_connection(qb => {
            qb.select(['firstname', 'lastname', 'email', 'id'])
                .where({ email: email })
                .get('users', (err, results) => {
                    qb.release();

                    resolve({ status: true, data: results });
                });
        });
    })
}

module.exports.get_user_details = (user_id) => {
    return new Promise((resolve, reject) => {

        QueryBuilder.get_connection(qb => {
            qb.select(['firstname', 'lastname', 'email', 'phone', 'id', 'gender'])
                .where({ id: user_id })
                .get('users', (err, results) => {
                    qb.release();

                    resolve(results[0] || {});
                });
        });
    })
}