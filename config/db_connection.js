const mysql = require('mysql');
const QueryBuilder = require('node-querybuilder');

module.exports = new QueryBuilder({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce_node"
}, 'mysql', 'pool');