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

		//query = {
		//	text: `SELECT m.*
		//FROM producto p
		//JOIN materiales m ON m.id = ANY(p.materiales) WHERE p.sku = $1`,
		//	values: [id],
		//};
		//const resultMateriales = await db.query(query);

		//query = {
		//	text: `SELECT m.*
		//FROM producto p
		//JOIN preguntas m ON m.id = ANY(p.preguntas) WHERE p.sku = $1`,
		//	values: [id],
		//};
		//const resultPreguntas = await db.query(query);
		//	query = {
		//		text: `SELECT m.*
		//FROM producto p
		//JOIN imagen m ON m.id = ANY(p.imagenesUsuarios) WHERE p.sku = $1`,
		//		values: [id],
		//	};
		//	const resultImagen = await db.query(query);

		//	query = {
		//		text: `SELECT m.*
		//FROM producto p
		//JOIN proyectos_sagaon m ON m.id = ANY(p.proyectossagaon) WHERE p.sku = $1`,
		//		values: [id],
		//	};
		//	const resultProyectos = await db.query(query);
		//result.rows.forEach((producto) => {
		//	producto.preguntas = producto.preguntas.map((materialId) => {
		//		return resultPreguntas.rows.find(
		//			(material) => material.id === materialId
		//		);
		//	});
		//});
		//result.rows.forEach((producto) => {
		//	producto.materiales = producto.materiales.map((materialId) => {
		//		return resultMateriales.rows.find(
		//			(material) => material.id === materialId
		//		);
		//	});
		//});
		//	result.rows.forEach((producto) => {
		//		producto.imagenesusuarios = producto.imagenesusuarios.map((imagenID) => {
		//			return resultImagen.rows.find((imagen) => imagen.id === imagenID);
		//		});
		//	});
		//	result.rows.forEach((producto) => {
		//		producto.proyectossagaon = producto.proyectossagaon.map((imagenID) => {
		//			return resultProyectos.rows.find((imagen) => imagen.id === imagenID);
		//		});
		//	});
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(400).send('Internal Server Error');
	}
});
server.on('error', console.error);
module.exports = app;