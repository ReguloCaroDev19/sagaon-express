const express = require('express');
const db = require('./src/db');
const cors = require('cors');

const app = express();
const port = 3333;
app.use(cors());

app.get('/api', (req, res) => {
	res.send({ message: 'Welcome to express-sagaon!' });
});

const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}/api`);
});

app.get('/:id', async (req, res) => {
	const { id } = req.params;

	try {
		let query = {
			text: `SELECT p.* FROM producto p WHERE p.sku = $1`,
			values: [id],
		};
		const result = await db.query(query);
		query = {
			text: `SELECT m.*
				FROM materiales m
				JOIN materiales_productos mp ON m.id = mp.id_material
				JOIN producto p ON mp.id_producto = p.id
				WHERE p.sku = $1`,
			values: [id],
		};
		const resultadoMateriales = await db.query(query);
		if (!result.rows[0].materiales) {
			result.rows[0].materiales = [];
		}
		result.rows[0].materiales.push(resultadoMateriales.rows);
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(400).send('Internal Server Error');
	}
});
server.on('error', console.error);
module.exports = app;