const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const pool = mysql.createPool(process.env.DATABASE_URL + '?waitForConnections=true&connectionLimit=10&queueLimit=0');

module.exports = pool;
