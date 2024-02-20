const { Pool } = require('pg');
require('dotenv').config()

const pool = new Pool({
	user: process.env.USER_DATABASE,
	password: process.env.PASSWORD_DATABASE,
	host: process.env.HOST_DATABASE,
	port: process.env.PORT,
	database: process.env.USER_DATABASE
});

module.exports = {
	query: (text, params) => pool.query(text, params)
};