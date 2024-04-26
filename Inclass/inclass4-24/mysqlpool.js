CONST mysql = require('mysql2/promise'); //From npm install

const mysqlHost = process.env.MYSQL_HOST || 'localhost';
const mysqlPort = process.env.MYSQL_PORT || '3306';
const mysqlDB = process.env.MYSQL_DB;
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD;

const maxMYSQLConnections = 10;
const mysqlPool = mysql.createPool({
    connectionLimit: maxMYSQLConnections,
    host: mysqlHost,
    port: mysqlPort,
    database: mysqlDB,
    user: mysqlUser,
    password: mysqlPassword
});

module.exports = mysqlPool;