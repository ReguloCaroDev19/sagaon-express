const { Pool } = require('pg');

const pool = new Pool({
	user: 'ekptanti',
	password: 'XwIVv0eZt4V-2bIsLKee0bMTMawbsi_v',
	host: 'bubble.db.elephantsql.com',
	port: 5432,
	database: 'ekptanti'
});

module.exports = {
	query: (text, params) => pool.query(text, params)
};