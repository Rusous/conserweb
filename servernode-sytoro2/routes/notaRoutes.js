import express from "express";
import { isAdmin, isAuth } from "../utils.js";

import Arrendatario from "../models/arrendatarioModels.js";
import Nota from "../models/notaModels.js";

const notaRouter = express.Router();

notaRouter.get("/leer-notas", isAuth, async (req, res) => {
	try {
		const notasList = await Nota.find();

		res.json(notasList);
	} catch (error) {
		console.log(error);
	}
});

notaRouter.post("/checking-notas", isAuth, async (req, res, next) => {
	try {

		const isNota = await Nota.findOne({ start: req.body.fecha });
		// console.log(isNota);

		if (isNota) {
			return res.status(403).json({
				message: "porfavor click sobre la nota, sola una es permitida",
			});
		}

		res.json({ message: "puedes agregar" });
	} catch (error) {
		console.log(error);
	}
});

notaRouter.delete("/eliminar-visita/:idNota/:idV", isAuth, async (req, res) => {
	console.log("en routa eliminar Visita");

	const {idNota, idV} = req.params

	try {

		const nota = await Nota.findById(idNota)

		const newVistas = nota.visitas.filter(item => item.idV !== idV)

		// nota.nota = req.body.nota || nota.nota;
		nota.visitas = newVistas || nota.visitas;
		const notaSaved = await nota.save();

		res.status(201).json(notaSaved);
	} catch (error) {
		console.log(error);
	}
});

notaRouter.post("/crear-nota", isAuth, async (req, res) => {
	console.log("en routa crear notas");

	try {
		let nota;

		if (req.body._id) {
			
			nota = await Nota.findById(req.body._id);
		} else {
		
			nota = new Nota(req.body);
			nota.createdBy = req.user._id;
		}

		nota.nota = req.body.nota || nota.nota;
		nota.visitas = req.body.visitas || nota.visitas;
		const notaSaved = await nota.save();

		// Update menciones in Arrendatario model
		const arrendatarios = await Arrendatario.find({
			_id: { $in: req.body.arrendatariosIds },
		});


		for (const arrendatario of arrendatarios) {
			// Verificar si nota.start ya existe en menciones
			// const mencionExists = arrendatario.menciones.includes(nota.start);
			const mencionExists = arrendatario.menciones.some(
				(mencion) => mencion.getTime() === nota.start.getTime()
			);

			if (!mencionExists) {
				// Agregar nota.start solo si no está presente
				arrendatario.menciones.push(nota.start);
				await arrendatario.save();
			}
		}

		res.status(201).json(notaSaved);
	} catch (error) {
		console.log(error);
	}
});

notaRouter.put('/editar-visita/:idNota/:idV', isAuth, async(req,res)=>{

	console.log('en ruta editar visita')

	const {idNota, idV} = req.params

	try {

		const nota = await Nota.findById(idNota)

		req.body.idV = idV
		const updatedVistas = nota.visitas.map(item => item.idV == idV ? req.body : item)

		nota.visitas = updatedVistas || nota.visitas
		const notaSaved = await nota.save()

		res.status(201).json(updatedVistas)
		
	} catch (error) {
		console.log(error)
	}

})

notaRouter.get("/buscar-nota/:fecha", isAuth, async (req, res) => {
	console.log('ruta buscar nota fechas');

	try {
		const notaFiltered = await Nota.findOne({ start: req.params.fecha });

		console.log(notaFiltered);
		res.json(notaFiltered);
	} catch (error) {
		console.log(error);
	}
});

export default notaRouter;
