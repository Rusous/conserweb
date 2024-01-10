import express from "express";
import { isAdmin, isAuth } from "../utils.js";

import Arrendatario from "../models/arrendatarioModels.js";

const arrendatarioRouter = express.Router();

//esta va ser traer todos los arrendatarios, tested por ahora
arrendatarioRouter.get(
	"/all-arrendatarios",
	isAuth,
	isAdmin,
	async (req, res) => {
		try {
			const arrendatarios = await Arrendatario.find().sort({ _id: -1 });
			res.json(arrendatarios);
		} catch (error) {
			console.log(error);
		}
	}
);

arrendatarioRouter.post("/create-arrendatario",	isAuth,	isAdmin,async (req, res) => {
		console.log("en la ruta create-arrendatario");

		const { name, rut, email, apartamento, estacionamiento } = req.body;
		try {
			const isUserDb = await Arrendatario.findOne({ rut });

			// console.log(isUserDb)
			if (isUserDb) {
				return res.status(400).json({ message: "Arrendatario ya Existe" });
			}

			const newUser = new Arrendatario(req.body);
			await newUser.save();

			const newListedUsers = await Arrendatario.find().sort({ _id: -1 });

			res.json(newListedUsers);
		} catch (error) {
			console.log(error);
			//to check mongoose validation error like empty data
			if (error.name === "ValidationError") {
				let errors = [];

				Object.keys(error.errors).forEach((key) => {
					//   errors[key] = error.errors[key].message;
					errors.push(error.errors[key].message);
				});
				return res.status(400).send({ message: errors.join(" ||| ") });
			}

			res.status(500).send({ message: "Something went wrong" });
		}
	}
);

arrendatarioRouter.put("/editar-arrendatario/:id",	isAuth,	isAdmin,async (req, res) => {
	console.log("en la ruta editar-arrendatario");

	const { name, rut, email, apartamento, estacionamiento, dueno } = req.body;

	const {id} = req.params

	try {
		const isUserDb = await Arrendatario.findById(id);

		isUserDb.name = name || isUserDb.name
		isUserDb.rut = rut || isUserDb.rut
		isUserDb.email = email || isUserDb.email
		isUserDb.apartamento = apartamento || isUserDb.apartamento
		isUserDb.estacionamiento = estacionamiento || isUserDb.estacionamiento
		isUserDb.dueno = dueno || isUserDb.dueno

		const isUserDbEdited =  await isUserDb.save();

		const newListedUsers = await Arrendatario.find().sort({ _id: -1 });

		res.json(newListedUsers);
	} catch (error) {
		console.log(error);
		//to check mongoose validation error like empty data
		if (error.name === "ValidationError") {
			let errors = [];

			Object.keys(error.errors).forEach((key) => {
				//   errors[key] = error.errors[key].message;
				errors.push(error.errors[key].message);
			});
			return res.status(400).send({ message: errors.join(" ||| ") });
		}

		res.status(500).send({ message: "Something went wrong" });
	}
}
);

arrendatarioRouter.delete("/delete-arrendatario/:id", async (req, res) => {
	console.log("en delete route arrendatario");

	const { id } = req.params;

	try {
		const deletedUser = await Arrendatario.deleteOne({ _id: id });

		if (deletedUser.deletedCount === 0) {
			return res.status(404).json({ message: "Usuario no Encontrado" });
		}

		const newListUsers = await Arrendatario.find().sort({ _id: -1 });

		res.json(newListUsers);
	} catch (error) {
		console.log(error);
	}
});

//buscar arrendatario
arrendatarioRouter.post("/buscar", isAuth, async (req, res) => {
	console.log('en la ruta buscar')
	try {
		if (!req.body.buscar) {
			return res.json([]);
		}
		const regex = new RegExp(req.body.buscar, "i");

		const filtro = req.body.filtro ? req.body.filtro : "name";

		const query = {};
		if (filtro === "apartamento") {
			// Si el filtro es 'apartamento', busca por número directamente
			const numeroApartamento = req.body.buscar;
			
			if (!isNaN(numeroApartamento)) {
				query[filtro] = numeroApartamento;
	
			} else {
				return res.status(404).json({
					message: "El valor de apartamento debe ser un número válido.",
				});
			}
		} else if (filtro === "estacionamiento") {
			// Si el filtro es 'apartamento', busca por número directamente
			const numeroEstacionamiento = req.body.buscar;
			if (!isNaN(numeroEstacionamiento)) {
				query[filtro] = numeroEstacionamiento;
				
			} else {
				return res.status(404).json({
					message: "El valor de estacionamiento debe ser un número válido.",
				});
			}
		} else {
			// Para otros campos, utiliza la expresión regular
			query[filtro] = { $regex: regex };
		}

		const filteredArrendatario = await Arrendatario.findOne(query);

		res.json(filteredArrendatario);
	} catch (error) {
		console.log(error);
	}
});

//este es para mandar solo los nombres en la parte de las notas
arrendatarioRouter.get("/arrendatarios-by-name", isAuth, async (req, res) => {
	console.log('en ruta arrendatarios by name')
	try {
		const nombresArrendatarios = await Arrendatario.find({}, "name");

		console.log(nombresArrendatarios);
		res.json(nombresArrendatarios);
	} catch (error) {
		console.log(error);
	}
});

//este es para mandar solo los departamento en la parte de las notas
arrendatarioRouter.get("/arrendatarios-by-apt", isAuth, async (req, res) => {
	try {
		const apartamentoArrendatarios = await Arrendatario.find({}, "apartamento");

		console.log(apartamentoArrendatarios);
		res.json(apartamentoArrendatarios);
	} catch (error) {
		console.log(error);
	}
});

//este es para mandar solo los estacionamientos en la parte de las notas
arrendatarioRouter.get("/arrendatarios-by-est", isAuth, async (req, res) => {
	try {
		const apartamentoArrendatarios = await Arrendatario.find(
			{},
			"estacionamiento"
		);

		const mappedApart = apartamentoArrendatarios.filter(
			(item) => item.estacionamiento != 0
		);

		// console.log(apartamentoArrendatarios)
		res.json(mappedApart);
	} catch (error) {
		console.log(error);
	}
});

export default arrendatarioRouter;
